import { useDisclosure } from "@mantine/hooks";
import { useEffect, useMemo, useRef, useState } from "react";
import { getProductsService } from "../../Products/services";
import { DataTableColumn } from "mantine-datatable";
import { Flex, Text } from "@mantine/core";
import { Title } from "../../../layouts";
import InputsFilters from "../../../components/InputsFilters";
import { DataTable } from "../../../components";


export interface ProductData {
    id: string,
    code: string,
    name: string,
    price: number | string,
    quantity: number,
    status: boolean | string,
    minStock: number,
    maxStock: number,
    supplier: string,
    category: string,
    promotion: string,
    tax: string,
}

function InventoryTable() {
    const [listProducts, setListProducts] = useState<ProductData[]>([]);
    const listProductsRef = useRef<ProductData[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null)
    const [opened, { open, close }] = useDisclosure()
    const [openedDialog, { close: closeDialog }] = useDisclosure()



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
                supplier:(product.supplier != null) ? product.supplier.name : "",
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
            ({ code, name, promotion, status, category, tax , supplier}: ProductData) => {
                const filter = `${code} ${category} ${name} ${promotion} ${status} ${tax} ${supplier}`;
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
    ], [])

    return (

        <Flex direction="column" h="100%" gap=".15rem">
            <Flex justify="space-between" align="center">
                <InputsFilters onChangeFilters={generalFilter} />
            </Flex>
            <DataTable columns={ProductsColumns} records={listProducts} />
        </Flex>
    )
}

export default InventoryTable
