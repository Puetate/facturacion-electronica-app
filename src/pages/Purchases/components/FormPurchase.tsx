import { Button, Flex, NumberInput, Select, Space, Text, TextInput, createStyles } from "@mantine/core"
import { useEffect, useRef, useState } from "react";
import { Catalog, State, } from "../../../models";
import { SnackbarManager } from "../../../utils";
import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import { PurchaseData } from "./PurchaseTable";
import { getCatalogSuppliersService } from "../../Supplier/services";
import { ProductTable } from "../../Products/components";
import { IconCirclePlus } from "@tabler/icons-react";


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
    },
    labelTotal: {
        color: theme.colors.blue[5],
        fontSize: "1.5rem",
        fontWeight: "bold",
        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },
    total: {
        color: theme.colors.black[7],
        fontSize: "2.2rem",
        fontWeight: "bold",
        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },

}));



export const itemState = [
    { value: "true", label: State.ACTIVE },
    { value: "false", label: State.INACTIVE },
];

const initialValues: PurchaseData = {
    id: "",
    purchaseNumber: "",
    purchaseDate: "",
    supplier: "",
    quantity: 0,
    total: "",
    user: "",
    payment: "",
}

const validationSchema = Yup.object<PurchaseData>().shape({
    purchaseDate: Yup.string().required("El código es obligatorio"),
    supplier: Yup.string().required("El nombre es es obligatorio"),
    price: Yup.number().required("El precio es obligatorio"),
    quantity: Yup.number().required("La cantidad es obligatorio"),
    total: Yup.string().required("La estado es obligatorio"),
    user: Yup.number().required("El mínimo de Stock es obligatorio"),
    payment: Yup.number().required("El máximo de Stock  es obligatorio"),
});


function FormPurchase({ onSubmitSuccess, onCancel, selectedPurchase }:
    {
        onSubmitSuccess: () => void,
        onCancel: () => void,
        selectedPurchase: PurchaseData | null
    }) {
    const { classes } = useStyles();
    const [loading, setLoading] = useState(false);
    const idRef = useRef<string>(selectedPurchase?.id || "");
    const [catalogSuppliers, setCatalogSuppliers] = useState<Catalog[]>([])


    const form = useForm({
        initialValues: idRef.current && selectedPurchase !== null ?
            { ...selectedPurchase } :
            initialValues,
        validate: yupResolver(validationSchema)
    })



    const handleSubmit = async (formPurchase: PurchaseData) => {
        /* setLoading(true)
        console.log(formPurchase);

        formPurchase.status = formPurchase.status as boolean
        if (idRef.current !== "") {
            const res = await editPurchaseService(idRef.current, formPurchase)
            if (res.error || res.data == null) return setLoading(false)
            SnackbarManager.success("Purchaseo editado exitosamente")
        } else {
            const res = await savePurchaseService(formPurchase)
            if (res.error || res.data == null) return setLoading(false)
            SnackbarManager.success("Purchaseo creado exitosamente")
        }
        setLoading(false)
        onSubmitSuccess()
        onCancel(); */
    }

    const getCatalogSuppliers = async () => {
        const catalog = await getCatalogSuppliersService();
        if (catalog === null) return;
        setCatalogSuppliers(catalog);
    }

    useEffect(() => {
        getCatalogSuppliers();
    }, [])


    return (
        <Flex direction="column" p="lg">

            <Text className={classes.title} align="center" mb="lg">Crear Compra</Text>
            <form onSubmit={form.onSubmit(handleSubmit)} >
                <Flex direction="row" gap="md">
                    <Select
                        withAsterisk
                        label="Seleccione el Proveedor"
                        placeholder="Seleccione"
                        data={catalogSuppliers}
                        {...form.getInputProps("status")}
                    />
                </Flex>
                <Space h="md" />
                <Flex justify="space-between" direction="row">
                    <Button color="orange" leftIcon={<IconCirclePlus />} onClick={onCancel}>Añadir</Button>
                    <Flex direction="column" justify="center" align="center">
                        <Text className={classes.labelTotal} align="center" >Total</Text>
                        <Text className={classes.total} align="center" >40.50</Text>
                    </Flex>
                </Flex>
                <ProductTable />
                <Flex justify="space-between" mt="lg">
                    <Button variant="white" onClick={onCancel}>Cancelar</Button>
                    <Button loading={loading} type="submit">Aceptar</Button>
                </Flex>
            </form>
        </Flex>
    )
}

export default FormPurchase