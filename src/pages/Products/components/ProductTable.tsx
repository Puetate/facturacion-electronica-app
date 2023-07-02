import { useEffect, useMemo, useRef, useState } from "react";
import { DataTableColumn } from "mantine-datatable"
import { ActionIcon, Button, Flex, Group, Tooltip, Text } from "@mantine/core";
import { IconCirclePlus, IconEdit, IconTrash } from "@tabler/icons-react";
import { ConfirmDialog, DataTable } from "../../../components";
import { useDisclosure } from "@mantine/hooks";
import MantineDrawer from "../../../components/Drawer";
import InputsFilters from "../../../components/InputsFilters";
import { Title } from "../../../layouts";
import { FormProduct } from ".";
import { getProductService, getProductsService } from "../services";
import { getProductProperties } from "../../../utils";


//const TITLE = "Categorías";
const CONFIRM_MESSAGE = "¿Seguro que desea eliminar el producto?"
//const SUCCESS_DELETE = "Producto eliminada exitosamente"

export interface ProductData {
    id: string,
    code: string,
    name: string,
    price: number | string,
    quantity: number,
    status: boolean | string
    minStock: number,
    maxStock: number
    category: string,
    promotion: string,
    tax: string,

}

function ProductTable() {
    const [listProducts, setListProducts] = useState<ProductData[]>([]);
    const listProductsRef = useRef<ProductData[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null)
    const [opened, { open, close }] = useDisclosure()
    const [openedDialog, { open: openDialog, close: closeDialog }] = useDisclosure()


    const onClickEditButton = async (product: ProductData) => {
        console.log(product);

        const { id } = product;
        const productToEdit = await getProduct(id);
        if (productToEdit == null) return;
        setSelectedProduct({ ...productToEdit });
        open()
    }

    const onClickDeleteButton = (Product: ProductData) => {
        setSelectedProduct(Product);
        openDialog()
    }

    const getProduct = async (id: string) => {
        const res = await getProductService(id);
        if (res.error || res.data === null) return null;

        return getProductProperties(res.data.data);
    };

    const handleDeleteRoutineAlert = async () => {
        const { id } = selectedProduct!;
        if (!id) return;
        /* const res = await deleteProductService(id);
        if (res.error || res.data === null) return
        SnackbarManager.success(SUCCESS_DELETE)
        onSubmitSuccess();
        closeDialog(); */
    }
    const onClickAddButton = () => {
        setSelectedProduct(null);
        open()
    }

    const getProducts = async () => {
        const res = await getProductsService();
        if (res.error || res.data === null) return
        const productsData = res.data.data;

        const products: ProductData[] = productsData.map(product => (
            {
                id: product.id,
                code: product.code,
                name: product.name,
                price: `$ ${product.price}`,
                quantity: product.quantity,
                status: product.status,
                minStock: product.minStock,
                maxStock: product.maxStock,
                category: (product.category != null) ? product.category.category : "",
                promotion: (product.promotion != null) ? product.promotion.description : "",
                tax: (product.tax?.percentage != null) ? `${product.tax.percentage}%` : "",
            }
        ));
        setListProducts(products);
        listProductsRef.current = products;
    };

    const generalFilter = (value: string) => {
        if (value == "") {
            return setListProducts(listProductsRef.current);
        }
        const filteredList = listProductsRef.current.filter(
            ({ code, name, promotion, status, category, tax }: ProductData) => {
                const filter = `${code} ${category} ${name} ${promotion} ${status} ${tax}`;
                return filter.toLowerCase().includes(value.trim().toLowerCase());
            },
        );
        return setListProducts(filteredList);

    }

    useEffect(() => {
        getProducts();
    }, [])

    const onSubmitSuccess = async () => {
        close()
        await getProducts()
    }

    const ProductsColumns = useMemo<DataTableColumn<ProductData>[]>(() => [
        { accessor: "code", title: "Código", textAlignment: 'center' },
        { accessor: "name", title: "Producto", textAlignment: 'center' },
        { accessor: "category", title: "Categoría", textAlignment: 'center' },
        { accessor: "quantity", title: "Existencia", textAlignment: 'center' },
        { accessor: "promotion", title: "Promoción", textAlignment: 'center' },
        { accessor: "price", title: "Precio Unitario", textAlignment: 'center' },
        { accessor: "tax", title: "Impuesto", textAlignment: 'center' },
        { accessor: "minStock", title: "Min. Stock", textAlignment: 'center' },
        { accessor: "maxStock", title: "Max. Stock", textAlignment: 'center' },
        { accessor: "status", title: "Estado", textAlignment: 'center', render: (Product) => <Text>{(Product.status) ? "Activo" : "Inactivo"}</Text> },
        {
            accessor: "actions",
            title: "Acciones",
            render: (Product) => (
                <Group spacing={10} position="center" noWrap>
                    <>
                        <ActionIcon
                            color="red"
                            variant="light"

                            onClick={() => onClickDeleteButton(Product)}
                        >
                            <IconTrash />
                        </ActionIcon>
                        <Tooltip label="Editar">
                            <ActionIcon
                                color="violet"
                                variant="light"
                                onClick={() => onClickEditButton(Product)}
                            >
                                <IconEdit />
                            </ActionIcon>
                        </Tooltip>
                    </>
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
            <DataTable columns={ProductsColumns} records={listProducts} />
            <ConfirmDialog opened={openedDialog} onClose={closeDialog} message={CONFIRM_MESSAGE} onConfirm={handleDeleteRoutineAlert} />
            <MantineDrawer opened={opened} close={close} >
                <FormProduct onCancel={close} onSubmitSuccess={onSubmitSuccess} selectedProduct={selectedProduct} />
            </MantineDrawer>
        </Flex>
    )
}

export default ProductTable