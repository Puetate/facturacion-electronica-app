import { Button, Flex } from "@mantine/core";
import { Bill } from "../../../models";
import { useSessionStore } from "../../../store";
import { SnackbarManager } from "../../../utils";
import { saveBillService } from "../service";
import { ProductDetail, useSalesStore } from "../store";

export interface Billing extends Omit<Bill, "client" | "user" | "details" | "invoiceNumber" | "issueDate" | "keyAccess" | "status" | "payment"> {
    client: string;
    user: string;
    payment:string;
    details: ProductDetail[];
}

const IVA = 1.12;
export default function Controls() {
    const { clearStore, client, productsDetail, totalToPay } = useSalesStore((state) => ({
        clearStore: state.clearStore,
        totalToPay: state.totalToPay,
        client: state.client,
        productsDetail: state.productsDetail
    }));
    const { user } = useSessionStore((state) => ({ user: state.user }));
    const handleBilling = async () => {
        console.log(productsDetail);
        
        const bill: Billing = {
            client: client.id,
            description: "Email del comprador: comprador@gmail.com",
            details: productsDetail,
            iva: 0.12,
            subtotalExcludingIVA: totalToPay / IVA,
            total: totalToPay,
            user: user.id,
            /* payment:"82ae0ef1-9276-4c3c-9300-40fb61528f91", */
            payment:"84bba4c8-0221-440f-a1e8-0ceeb1b8000b",
            discount: productsDetail.reduce((total, current) => total + current.discount, 0)
        }
        const res = await saveBillService(bill);
        if (res.error || res.data == null) return;
        SnackbarManager.success("Factura generada exitosamente");
    }
    return (
        <Flex justify="flex-end" gap="lg">
            <Button onClick={handleBilling}>Facturar</Button>
            <Button color="red" onClick={clearStore}>Cancelar</Button>
        </Flex>
    )
}