import { Button, Checkbox, Modal, Text, createStyles } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { DataTableColumn } from "mantine-datatable";
import { useEffect, useState } from "react";
import { DataTable } from "../../../components";
import { Product } from "../../../models";
import { getProductsService } from "../../Products/services";
import { ProductDetail, useSalesStore } from "../store";

export interface SelectedProduct extends Product {
    isSelected: boolean;
}

const useStyles = createStyles(() => ({
    body: {
        justifyContent: "center"
    }
}));

export default function ProductButton() {
    const [products, setProducts] = useState<SelectedProduct[]>();
    const [opened, { open, close }] = useDisclosure();
    const { productsDetail, addProductDetail, removeProductDetail } = useSalesStore((state) => ({
        productsDetail: state.productsDetail,
        addProductDetail: state.addProductDetail,
        removeProductDetail: state.removeProductDetail,
    }));

    const { classes } = useStyles();

    const getProducts = async () => {
        const res = await getProductsService();
        if (res.error || res.data == null) return;
        const selectedProducts: SelectedProduct[] = res.data.data.map((p) => ({ ...p, isSelected: false }));
        setProducts(selectedProducts);
    }

    const convertProductoToProductDetail = (product: Product): ProductDetail => {
        const discount = (product.promotion != null) ? product.promotion.value || product.category.promotion.value || 0 : 0
        const productDetail: ProductDetail = {
            id: product.id,
            name: product.name,
            discount,
            quantity: 1,
            price: product.price,
            subtotal: (product.promotion != null) ? ((1 * product.price) * (1 - product.promotion.value)) : ((1 * product.price) * (1 )),
            product: product.id,
            subtotalExcludingIVA: 1 * product.quantity,
        }
        return productDetail
    }

    const handleCheckSelectedProduct = (checkedProduct: SelectedProduct, index: number, checked: boolean) => {
        if (products == undefined) return;
        const { isSelected, ...selectedProduct } = checkedProduct;
        const productDetail = checked ?
            convertProductoToProductDetail(selectedProduct) :
            convertProductoToProductDetail(checkedProduct);
        (checked) ?
            addProductDetail(productDetail) :
            removeProductDetail(productDetail);
        checkedProduct = { ...checkedProduct, isSelected: checked };
        const product: SelectedProduct[] = [...products];
        product[index] = checkedProduct;
        setProducts(product);
    }

    const columns: DataTableColumn<SelectedProduct>[] = [
        { accessor: "code", title: "Código", textAlignment: 'center' },
        { accessor: "name", title: "Nombre", textAlignment: 'center' },
        { accessor: "promotion", title: "Promoción", textAlignment: 'center', render: (product) => ((product.promotion != null) ? <Text>{product.promotion.value}</Text> : <Text>-</Text>) },
        { accessor: "price", title: "Precio", textAlignment: 'center' },
        {
            accessor: "add", title: "añadir", textAlignment: 'center', render: (product, index) => (
                <Checkbox classNames={classes} checked={product.isSelected} onChange={(e) => handleCheckSelectedProduct(product, index, e.target.checked)} />
            )
        },
    ]

    useEffect(() => {
        getProducts();
    }, [])

    useEffect(() => {
        if (productsDetail.length == 0)
            getProducts();
    }, [productsDetail])

    return (
        <>
            <Button onClick={open} leftIcon={<IconPlus />} color="orange" tt="uppercase">Añadir Producto</Button>
            <Modal opened={opened} onClose={close} size="lg">
                <DataTable columns={columns} records={products} />
            </Modal>
        </>
    )
}