import { useEffect, useMemo, useRef, useState } from "react";
import { DataTableColumn } from "mantine-datatable"
import { ActionIcon, Button, Flex, Group, Tooltip, Text } from "@mantine/core";
import { IconCirclePlus, IconEdit } from "@tabler/icons-react";
import { ConfirmDialog, DataTable } from "../../../components";
import { useDisclosure } from "@mantine/hooks";
import MantineDrawer from "../../../components/Drawer";
import InputsFilters from "../../../components/InputsFilters";
import { Title } from "../../../layouts";
import { FormPurchase } from ".";

export interface PurchaseData {
    id: string,
    purchaseNumber: string,
    purchaseDate: string,
    supplier: number | string,
    quantity: number,
    total: boolean | string
    user: string,
    payment: string
}

function PurchaseTable() {
    const [listPurchases, setListPurchases] = useState<PurchaseData[]>([]);
    const listPurchasesRef = useRef<PurchaseData[]>([]);
    const [selectedPurchase, setSelectedPurchase] = useState<PurchaseData | null>(null)
    const [opened, { open, close }] = useDisclosure()
    const [openedDialog, { close: closeDialog }] = useDisclosure()


    const onClickEditButton = async (Purchase: PurchaseData) => {
        /* console.log(Purchase);

        const { id } = Purchase;
        const PurchaseToEdit = await getPurchase(id);
        if (PurchaseToEdit == null) return;
        setSelectedPurchase({ ...PurchaseToEdit });
        open() */
    }

    const getPurchase = async (id: string) => {
        /*  const res = await getPurchaseService(id);
         if (res.error || res.data === null) return null;
 
         return getPurchaseProperties(res.data.data); */
    };

    const handleDeleteRoutineAlert = async () => {
        const { id } = selectedPurchase!;
        if (!id) return;
        /* const res = await deletePurchaseService(id);
        if (res.error || res.data === null) return
        SnackbarManager.success(SUCCESS_DELETE)
        onSubmitSuccess();
        closeDialog(); */
    }
    const onClickAddButton = () => {
        setSelectedPurchase(null);
        open()
    }

    const getPurchases = async () => {
        /* const res = await getPurchasesService();
        if (res.error || res.data === null) return
        const PurchasesData = res.data.data;

        const Purchases: PurchaseData[] = PurchasesData.map(Purchase => (
            {
                id: Purchase.id,
                code: Purchase.code,
                name: Purchase.name,
                price: `$ ${Purchase.price}`,
                quantity: Purchase.quantity,
                status: Purchase.status,
                minStock: Purchase.minStock,
                maxStock: Purchase.maxStock,
                category: (Purchase.category != null) ? Purchase.category.category : "",
                promotion: (Purchase.promotion != null) ? Purchase.promotion.description : "",
                tax: (Purchase.tax?.percentage != null) ? `${Purchase.tax.percentage}%` : "",
            }
        ));
        setListPurchases(Purchases);
        listPurchasesRef.current = Purchases; */
    };

    const generalFilter = (value: string) => {
        /* if (value == "") {
            return setListPurchases(listPurchasesRef.current);
        }
        const filteredList = listPurchasesRef.current.filter(
            ({ code, name, promotion, status, category, tax }: PurchaseData) => {
                const filter = `${code} ${category} ${name} ${promotion} ${status} ${tax}`;
                return filter.toLowerCase().includes(value.trim().toLowerCase());
            },
        );
        return setListPurchases(filteredList); */

    }

    useEffect(() => {
        getPurchases();
    }, [])

    const onSubmitSuccess = async () => {
        close()
        await getPurchases()
    }

    const PurchasesColumns = useMemo<DataTableColumn<PurchaseData>[]>(() => [
        { accessor: "purchaseNumber", title: "Factura", textAlignment: 'center' },
        { accessor: "purchaseDate", title: "Fecha Compra", textAlignment: 'center' },
        { accessor: "user", title: "Usuario", textAlignment: 'center' },
        { accessor: "supplier", title: "Proveedor", textAlignment: 'center' },
        { accessor: "payment", title: "Tipo de pago", textAlignment: 'center' },
        { accessor: "quantity", title: "Cantidad", textAlignment: 'center' },
        { accessor: "total", title: "Total", textAlignment: 'center' },
        {
            accessor: "actions",
            title: "Acciones",
            render: (Purchase) => (
                <Group spacing={10} position="center" noWrap>
                    <Tooltip label="Editar">
                        <ActionIcon
                            color="violet"
                            variant="light"
                            onClick={() => onClickEditButton(Purchase)}
                        >
                            <IconEdit />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            ),
            textAlignment: 'center'
        },

    ], [])

    return (

        <Flex direction="column" h="100%" gap=".15rem">
            <Title />
            <Flex justify="space-between" align="center">
                <InputsFilters onChangeFilters={generalFilter} />
                <Button size="md" leftIcon={<IconCirclePlus />} onClick={onClickAddButton}>
                    Agregar
                </Button>
            </Flex>
            {/* <DataTable columns={PurchasesColumns} records={listPurchases} /> */}
            <MantineDrawer opened={opened} close={close} isBig={true} >
                <FormPurchase onCancel={close} onSubmitSuccess={onSubmitSuccess} selectedPurchase={selectedPurchase} />
            </MantineDrawer>
        </Flex>
    )
}

export default PurchaseTable