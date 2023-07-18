import { Flex, NumberInput, Text } from "@mantine/core";
import { DataTableColumn } from "mantine-datatable";
import { shallow } from 'zustand/shallow';
import { DataTable } from "../../../components";
import { toFixed } from "../../../utils";
import { ProductDetail, useSalesStore } from "../store";
import Price from "./Price";
import ProductButton from "./ProductButton";

const IVA = 1.12;

export default function ProductsSection() {
    const { productsDetail, setProductsDetail, setTotalToPay } = useSalesStore((state) => ({
        productsDetail: state.productsDetail,
        setProductsDetail: state.setProductsDetail,
        setTotalToPay: state.setTotalToPay
    }), shallow);

    const columns: DataTableColumn<ProductDetail>[] = [
        { accessor: "product", title: "Código", textAlignment: 'center' },
        { accessor: "name", title: "Nombre", textAlignment: 'center' },
        {
            accessor: "price", title: "Precio", textAlignment: 'center',
            render: (productDetail) => (<Text>{`${productDetail.price}$`}</Text>)
        },
        {
            accessor: "quantity", title: "Cantidad", textAlignment: 'center',
            render: (productDetail, index) => (
                <NumberInput min={0} defaultValue={productDetail.quantity} onChange={(value) => updateProductDetail(index, value, "quantity")} />
            )
        },
        {
            accessor: "promotion", title: "Descuento", textAlignment: 'center',
            render: (productDetail, index) => {
                return <NumberInput min={0} defaultValue={productDetail.discount} onChange={(value) => updateProductDetail(index, value, "discount")} />;
            }
        },
        {
            accessor: "subtotal", title: "Subtotal", textAlignment: 'center',
            render: (productDetail) => {
                return (<Text>{productDetail.subtotal}</Text>)
            }
        },
    ];

    const updateProductDetail = (index: number, value: number | "", updateProp: keyof ProductDetail) => {
        if (value == "") value = 0;
        const products: ProductDetail[] = [...productsDetail];
        const product = { ...products[index], [updateProp]: updateProp == "discount" ? value / 100 : value };
        const subtotal = toFixed((product.quantity * product.price) * (1 - product.discount), 2);
        const subtotalExcludingIVA = toFixed(product.quantity * product.quantity, 1);
        products[index] = {
            ...product,
            subtotal: subtotal < 0 ? 0 : subtotal,
            subtotalExcludingIVA: subtotalExcludingIVA < 0 ? 0 : subtotalExcludingIVA
        };
        const totalToPay = products.reduce((total, currentValue) => total + currentValue.subtotal, 0) * IVA;
        setTotalToPay(totalToPay);
        setProductsDetail(products);
    }

    return (
        <Flex h="100%" direction="column">
            <Flex justify="space-between">
                <ProductButton />
                <Price />
            </Flex>
            <Text>Detalles</Text>
            <DataTable columns={columns} records={productsDetail} />
        </Flex>
    )
}