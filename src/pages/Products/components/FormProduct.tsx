import { Button, Flex, NumberInput, Select, Text, TextInput, createStyles } from "@mantine/core"
import { useEffect, useRef, useState } from "react";
import { State, } from "../../../models";
import { SnackbarManager } from "../../../utils";
import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import getCatalogTaxService, { Catalog } from "../../Tax/services/getCatalogTax.service";
import { ProductData } from "./ProductTable";
import { getCatalogCategoryService } from "../../Categories/services";
import { editProductService, saveProductService } from "../services";
import { getCatalogPromotionsService } from "../../Promotions/services";
import { getCatalogSuppliersService } from "../../Supplier/services";


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



export const itemState = [
    { value: "true", label: State.ACTIVE },
    { value: "false", label: State.INACTIVE },
];

const initialValues: ProductData = {
    id: "",
    code: "",
    name: "",
    price: 0.00,
    quantity: 0,
    status: "",
    minStock: 0,
    maxStock: 5,
    category: "",
    promotion: "",
    supplier:"",
    tax: "",
}

const validationSchema = Yup.object<ProductData>().shape({
    code: Yup.string().required("El código es obligatorio"),
    name: Yup.string().required("El nombre es es obligatorio"),
    price: Yup.number().required("El precio es obligatorio"),
    quantity: Yup.number().required("La cantidad es obligatorio"),
    status: Yup.string().required("La estado es obligatorio"),
    minStock: Yup.number().required("El mínimo de Stock es obligatorio"),
    maxStock: Yup.number().required("El máximo de Stock  es obligatorio"),
});


function FormProduct({ onSubmitSuccess, onCancel, selectedProduct }:
    {
        onSubmitSuccess: () => void,
        onCancel: () => void,
        selectedProduct: ProductData | null
    }) {
    const { classes } = useStyles();
    const [loading, setLoading] = useState(false);
    const idRef = useRef<string>(selectedProduct?.id || "");
    const [catalogTax, setCatalogTax] = useState<Catalog[]>([])
    const [catalogPromotions, setCatalogPromotions] = useState<Catalog[]>([])
    const [catalogCategories, setCatalogCategories] = useState<Catalog[]>([])
    const [catalogSuppliers, setCatalogSuppliers] = useState<Catalog[]>([])


    const form = useForm({
        initialValues: idRef.current && selectedProduct !== null ?
            { ...selectedProduct } :
            initialValues,
        validate: yupResolver(validationSchema)
    })



    const handleSubmit = async (formProduct: ProductData) => {
        setLoading(true)

        formProduct.status = formProduct.status as boolean
        if (idRef.current !== "") {
            const res = await editProductService(idRef.current, formProduct)
            if (res.error || res.data == null) return setLoading(false)
            SnackbarManager.success("Producto editado exitosamente")
        } else {
            const res = await saveProductService(formProduct)
            if (res.error || res.data == null) return setLoading(false)
            SnackbarManager.success("Producto creado exitosamente")
        }
        setLoading(false)
        onSubmitSuccess()
        onCancel();
    }

    const getCatalogTax = async () => {
        const catalog = await getCatalogTaxService();
        if (catalog === null) return;
        setCatalogTax(catalog);
    }

    const getCatalogPromotions = async () => {
        const catalog = await getCatalogPromotionsService();
        if (catalog === null) return;
        setCatalogPromotions(catalog);
    }

    const getCatalogCategories = async () => {
        const catalog = await getCatalogCategoryService();
        if (catalog === null) return;
        setCatalogCategories(catalog);
    }

    const getCatalogSuppliers = async () => {
        const catalog = await getCatalogSuppliersService();
        if (catalog === null) return;
        setCatalogSuppliers(catalog);
    }

    useEffect(() => {
        getCatalogTax();
        getCatalogPromotions();
        getCatalogCategories();
        getCatalogSuppliers();
    }, [])


    return (
        <Flex direction="column" p="lg">

            <Text className={classes.title} align="center" mb="lg">{idRef.current ? "Editar Producto" : "Crear Producto"}</Text>
            <form onSubmit={form.onSubmit(handleSubmit)} >
                <Flex direction="column" gap="md">
                    <TextInput
                        withAsterisk
                        disabled={(idRef.current != "") ? true : false}
                        label="Nombre del Producto"
                        {...form.getInputProps("name")}
                    />
                    <TextInput
                        disabled={(idRef.current != "") ? true : false}
                        width="1"
                        withAsterisk
                        label="Código"
                        {...form.getInputProps("code")}
                    />

                    <Select
                        clearable
                        withAsterisk
                        disabled={(idRef.current != "") ? true : false}
                        label="Categoría"
                        placeholder="Seleccione"
                        data={catalogCategories!}
                        {...form.getInputProps("category")}
                    />
                    <Flex
                        w="100%"
                        justify="space-between"
                        align="center"
                        gap="sm"
                        direction="row"
                        wrap="wrap"
                    >

                        <NumberInput
                            withAsterisk
                            className={classes.input}
                            label="Cantidad"
                            max={5000}
                            min={0}
                            {...form.getInputProps("quantity")}
                        />
                        <NumberInput
                            max={100000}
                            min={0}
                            precision={4}
                            className={classes.input}
                            decimalSeparator=","
                            withAsterisk
                            label="Precio Unitario"
                            {...form.getInputProps("price")}
                        />
                    </Flex>



                    <Flex
                        w="100%"
                        justify="space-between"
                        align="center"
                        gap="sm"
                        direction="row"
                        wrap="wrap"
                    >
                        <NumberInput
                            withAsterisk
                            description="Desde 0 a 500"
                            className={classes.input}
                            max={500}
                            min={0}
                            label="Mínimo en Stock"
                            {...form.getInputProps("minStock")}
                        />
                        <NumberInput
                            description="Desde 5 a 5000"
                            max={5000}
                            className={classes.input}

                            min={5}
                            withAsterisk
                            label="Máximo en Stock"
                            {...form.getInputProps("maxStock")}
                        />
                    </Flex>

                    <Select
                        clearable
                        label="Proveedor"
                        placeholder="Seleccione"
                        data={catalogSuppliers}
                        {...form.getInputProps("supplier")}

                    />

                    <Select
                        clearable
                        label="Promoción"
                        placeholder="Seleccione"
                        data={catalogPromotions}
                        {...form.getInputProps("promotion")}

                    />
                    <Select
                        clearable
                        label="Impuesto"
                        placeholder="Seleccione"
                        data={catalogTax}
                        {...form.getInputProps("tax")}
                    />

                    <Select
                        withAsterisk
                        label="Estado"
                        placeholder="Seleccione"
                        data={itemState}
                        {...form.getInputProps("status")}
                    />

                </Flex>
                <Flex justify="space-between" mt="lg">
                    <Button variant="white" onClick={onCancel}>Cancelar</Button>
                    <Button loading={loading} type="submit">Aceptar</Button>
                </Flex>
            </form>
        </Flex>
    )
}

export default FormProduct