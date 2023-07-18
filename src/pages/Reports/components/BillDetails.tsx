import { useEffect, useMemo, useState } from "react"
import { Bill } from "../../../models"
import { DataTableColumn } from "mantine-datatable"
import { Flex, Space, Text, createStyles } from "@mantine/core"
import { DataTable } from "../../../components"

const useStyles = createStyles((theme) => ({
    title: {
        color: theme.colors.blue[5],
        fontSize: "1.5rem",
        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },
    input: {
        flex: "40%"
    }

}));
function BillDetails({ bill }: { bill: Bill }) {
    const [listBillDetails, setListBillDetails] = useState<BillDetailData[]>([])
    const { classes } = useStyles();

    interface BillDetailData {
        id: string,
        product: string,
        price: string,
        quantity: string,
        discount: string
        subtotal: string
    }

    const getBillDetails = async () => {
        const billDetails: BillDetailData[] = bill.details.map(detail => (
            {
                id: bill.id!,
                product: detail.product.name,
                price: `${detail.price}$`,
                quantity: detail.quantity.toString(),
                discount: `${detail.discount}%`,
                subtotal: `${detail.subtotal}`,
            }
        ));
        setListBillDetails(billDetails);
    }

    useEffect(() => {
        getBillDetails();
    }, [])



    const billDetailsColumns = useMemo<DataTableColumn<BillDetailData>[]>(() => [
        { accessor: "product", title: "Producto", textAlignment: 'center' },
        { accessor: "price", title: "Precio", textAlignment: 'center' },
        { accessor: "quantity", title: "Cantidad", textAlignment: 'center' },
        { accessor: "discount", title: "Descuento", textAlignment: 'center', },
        { accessor: "subtotal", title: "Subtotal", textAlignment: 'center', },
    ], [])

    return (
        <Flex direction="column" h="100%" gap=".15rem">
            <Text className={classes.title} align="center" mb="lg">Detalle de venta</Text>

            <Flex direction="row" gap="xs">
                <Flex direction="column" gap="xs">
                    <Text fw={700}  >Fecha de Emisión: </Text>
                    <Text fw={700}>Identificación: </Text>
                    <Text fw={700}>Cliente: </Text>
                </Flex>
                <Flex direction="column" gap="xs">
                    <Text>{bill.issueDate}</Text>
                    <Text>{bill.client.identification}</Text>
                    <Text>{bill.client.fullname}</Text>
                </Flex>
            </Flex>
            <DataTable columns={billDetailsColumns} records={listBillDetails} />
            <Space h="lg" />
            <Flex direction="row" gap="xs" justify="end">
                <Flex direction="column" gap="xs">
                    <Text   >Descuento:</Text>
                    <Text   >Subtotal:</Text>
                    <Text   >IVA:</Text>
                    <Text >Total:</Text>
                </Flex>

                <Flex direction="column" gap="xs">
                    <Text fw={700}  >{`${bill.discount}%`}</Text>
                    <Text fw={700}  >{`$${bill.subtotalExcludingIVA}`}</Text>
                    <Text fw={700}  >{`${bill.iva}%`}</Text>
                    <Text fw={700}>{`$${bill.total}`}</Text>
                </Flex>

            </Flex>
        </Flex>
    )
}

export default BillDetails