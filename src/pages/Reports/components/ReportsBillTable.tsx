import { useEffect, useMemo, useRef, useState } from "react";
import { DataTableColumn } from "mantine-datatable"
import { ActionIcon, Flex, Group, Tooltip, Modal } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import { DataTable } from "../../../components";
import { useDisclosure } from "@mantine/hooks";
import InputsFilters from "../../../components/InputsFilters";
import { getBillService, getBillsService } from "../services";
import { Bill } from "../../../models";
import { BillDetails } from ".";



export interface BillData {
    id: string
    issueDate: string;
    user: string;
    client: string;
    identificationClient: string;
    status: string;
    iva: string;
    discount: string;
    subtotalExcludingIVA: number;
    total: number;
}

function BillTable() {
    const [listCategories, setListCategories] = useState<BillData[]>([]);
    const listCategoriesRef = useRef<BillData[]>([]);
    const [selectedBill, setSelectedBill] = useState<Bill | null>(null)
    const [opened, { open, close }] = useDisclosure()


    const onClickViewDetailButton = async (bill: BillData) => {
        const { id } = bill;
        const billToView = await getBill(id!);

        if (billToView == null) return;
        setSelectedBill({ ...billToView });
        open()
    }


    const getBill = async (id: string) => {
        const res = await getBillService(id);
        if (res.error || res.data === null) return null;

        return res.data.data;
    };

    const getCategories = async () => {
        const res = await getBillsService();
        if (res.error || res.data === null) return
        const billsData = res.data.data;

        const bills: BillData[] = billsData.map(bill => (
            {
                id: bill.id!,
                issueDate: bill.issueDate,
                user: bill.user.fullName,
                client: bill.client.fullname,
                identificationClient: bill.client.identification,
                status: "Pendiente",
                iva: `${bill.iva}%`,
                discount: `${bill.discount}%`,
                subtotalExcludingIVA: bill.subtotalExcludingIVA,
                total: bill.total,
            }
        ));
        setListCategories(bills);
        listCategoriesRef.current = bills;
    };

    const generalFilter = (value: string) => {
        if (value == "") {
            return setListCategories(listCategoriesRef.current);
        }
        const filteredList = listCategoriesRef.current.filter(
            ({ client, identificationClient }: BillData) => {
                const filter = `${client} ${identificationClient}`;
                return filter.toLowerCase().includes(value.trim().toLowerCase());

            },
        );
        return setListCategories(filteredList);

    }

    useEffect(() => {
        getCategories();
    }, [])

    const billsColumns = useMemo<DataTableColumn<BillData>[]>(() => [
        { accessor: "issueDate", title: "Fecha de Emision", textAlignment: 'center' },
        { accessor: "user", title: "Usuario", textAlignment: 'center' },
        { accessor: "client", title: "Cliente", textAlignment: 'center' },
        { accessor: "status", title: "Estado", textAlignment: 'center', },
        { accessor: "iva", title: "IVA", textAlignment: 'center' },
        { accessor: "discount", title: "Descuento", textAlignment: 'center' },
        { accessor: "subtotalExcludingIVA", title: "Subtotal", textAlignment: 'center' },
        { accessor: "total", title: "Total", textAlignment: 'center' },
        {
            accessor: "actions",
            title: "Acciones",
            render: (bill) => (
                <Group spacing={10} position="center" noWrap>
                    <Tooltip label="Ver Detalle">
                        <ActionIcon
                            color="violet"
                            variant="light"
                            onClick={() => onClickViewDetailButton(bill)}
                        >
                            <IconEye />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            ),
            textAlignment: 'center'
        },

    ], [])

    return (

        <Flex direction="column" h="100%" gap=".15rem">
            <Flex justify="space-between" align="center">
                <InputsFilters onChangeFilters={generalFilter} />
            </Flex>
            <DataTable columns={billsColumns} records={listCategories} />
            <Modal centered withCloseButton={false} opened={opened} onClose={close} size="lg">
                <BillDetails bill={selectedBill!} />
            </Modal>
        </Flex>
    )
}

export default BillTable