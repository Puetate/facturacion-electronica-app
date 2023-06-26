import { Button, Flex, Select, Text, TextInput, createStyles } from "@mantine/core"
import { useEffect, useRef, useState } from "react";
import { State, } from "../../../models";
import editCategoryService from "../services/editCategory.service";
import { SnackbarManager} from "../../../utils";
import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import { CategoryData } from "./CategoryTable";
import saveCategoryService from "../services/saveCategory.service";
import getCatalogTaxService, { Catalog } from "../../Tax/services/getCatalogTax.service";
import { getCatalogPromotionsService } from "../../Promotions/services";


const useStyles = createStyles((theme) => ({
    title: {
        color: theme.colors.blue[5],
        fontSize: "1.5rem",
        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },

}));



export const itemState = [
    { value: "true", label: State.ACTIVE },
    { value: "false", label: State.INACTIVE },
];

const initialValues: CategoryData = {
    id: "",
    tax: "",
    promotion: "",
    category: "",
    status: ""
}

const validationSchema = Yup.object<CategoryData>().shape({
    category: Yup.string().required("La categoría es obligatoria"),
    status: Yup.string().required("La estado es obligatorio"),
});


function FormCategory({ onSubmitSuccess, onCancel, selectedCategory }:
    {
        onSubmitSuccess: () => void,
        onCancel: () => void,
        selectedCategory: CategoryData | null
    }) {
    const { classes } = useStyles();
    const [loading, setLoading] = useState(false);
    const idRef = useRef<string>(selectedCategory?.id || "");
    const [catalogTax, setCatalogTax] = useState<Catalog[]>([])
    const [catalogPromotions, setCatalogPromotions] = useState<Catalog[]>([])


    const form = useForm({
        initialValues: idRef.current && selectedCategory !== null ?
            { ...selectedCategory } :
            initialValues,
        validate: yupResolver(validationSchema)
    })



    const handleSubmit = async (formCategory: CategoryData) => {
        setLoading(true)
        formCategory.status = formCategory.status as boolean
        if (idRef.current !== "") {
            const res = await editCategoryService(idRef.current, formCategory)
            if (res.error || res.data == null) return setLoading(false)
            SnackbarManager.success("Categoría editada exitosamente")
        } else {
            const res = await saveCategoryService(formCategory)
            if (res.error || res.data == null) return setLoading(false)
            SnackbarManager.success("Categoría creada exitosamente")
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

    useEffect(() => {
        getCatalogTax();
        getCatalogPromotions();

    }, [])


    return (
        <Flex direction="column" p="lg">

            <Text className={classes.title} align="center" mb="lg">{idRef.current ? "Editar Categoría" : "Crear Categoría"}</Text>
            <form onSubmit={form.onSubmit(handleSubmit)} >
                <Flex direction="column" gap="lg">
                    <TextInput
                        withAsterisk
                        label="Nombre de Categoría"
                        {...form.getInputProps("category")}
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
                        data={catalogTax!}
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

export default FormCategory