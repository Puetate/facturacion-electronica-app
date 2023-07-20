import { Button, Flex } from "@mantine/core";
import { Bill } from "../../../models";
import { useSessionStore } from "../../../store";
import { SnackbarManager } from "../../../utils";
import { saveBillService } from "../service";
import { ProductDetail, useSalesStore } from "../store";
import { useState } from "react";

export interface Billing extends Omit<Bill, "client" | "user" | "details" | "invoiceNumber" | "issueDate" | "keyAccess" | "status" | "payment"> {
    client: string;
    user: string;
    payment: string;
    details: ProductDetail[];
}

const IVA = 1.12;
export default function Controls() {
    const [loading, setLoading] = useState(false);
    const { clearStore, client, productsDetail, totalToPay } = useSalesStore((state) => ({
        clearStore: state.clearStore,
        totalToPay: state.totalToPay,
        client: state.client,
        productsDetail: state.productsDetail
    }));
    const { user } = useSessionStore((state) => ({ user: state.user }));
    const handleBilling = async () => {
        console.log(productsDetail);
        setLoading(true);
        const bill: Billing = {
            client: client.id,
            description: "Email del comprador: comprador@gmail.com",
            details: productsDetail,
            iva: 0.12,
            subtotalExcludingIVA: totalToPay / IVA,
            total: totalToPay,
            user: user.id,
            payment: "402abb7c-264d-422f-8071-44307e2e164e",
            /* payment:"84bba4c8-0221-440f-a1e8-0ceeb1b8000b", */
            discount: productsDetail.reduce((total, current) => total + current.discount, 0)
        }
        const res = await saveBillService(bill);
        if (res.error || res.data == null) return setLoading(false);
        SnackbarManager.success("Factura generada exitosamente");
        setLoading(false);
    }
    return (
        <Flex justify="flex-end" gap="lg">
            <Button disabled={loading} onClick={handleBilling}>Facturar</Button>
            <Button loading={loading} color="red" onClick={clearStore}>Cancelar</Button>
        </Flex>
    )
}