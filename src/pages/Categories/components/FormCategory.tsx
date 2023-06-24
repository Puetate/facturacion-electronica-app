import { Button, Flex, Select, TextInput } from "@mantine/core"
import { useEffect, useRef, useState } from "react";
import { State, } from "../../../models";
import editCategoryService from "../services/editCategory.service";
import { SnackbarManager } from "../../../utils";
import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import { CategoryData } from "./CategoryTable";
import saveCategoryService from "../services/saveCategory.service";
import getCatalogTaxService, { Catalog } from "../../Tax/services/getCatalogTax.service";


export const itemState = [
    { value: 'true', label: State.ACTIVE },
    { value: 'false', label: State.INACTIVE },
];

const initialValues: CategoryData = {
    id: "",
    tax: "",
    promotion: "",
    category: "",
    status: "false"
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
    const [loading, setLoading] = useState(false);
    const idRef = useRef<string>(selectedCategory?.id || "");
    const [catalogTax, setCatalogTax] = useState<Catalog[] >([])


    const form = useForm({
        initialValues: idRef.current && selectedCategory !== null ?
            { ...selectedCategory } :
            initialValues,
        validate: yupResolver(validationSchema)
    })



    const handleSubmit = async (formCategory: CategoryData) => {
        setLoading(true)
        if (idRef.current !== "") {
            const res = await editCategoryService(idRef.current, formCategory)
            if (res.error || res.data == null) return setLoading(false)
            SnackbarManager.success("Rutina editada exitosamente")
        } else {
            const res = await saveCategoryService(formCategory)
            if (res.error || res.data == null) return setLoading(false)
            SnackbarManager.success("Rutina creada exitosamente")
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

    useEffect(() => {
        getCatalogTax();

    }, [])


    return (
        <Flex direction="column" p="lg">
            {/* <Text align="center" mb="lg">{idRef.current ? "Editar notificación de rutina" : "Crear notificación de rutina"}</Text> */}
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
                        data={Object.values(catalogTax!)}
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