import { Button, Flex, NumberInput, Select, Text, TextInput, createStyles } from "@mantine/core";
import { State } from "../../../models";
import { TaxData } from "./TaxTable";
import * as Yup from "yup";
import { useRef, useState } from "react";
import { useForm, yupResolver } from "@mantine/form";
import { SnackbarManager } from "../../../utils";
import editTaxService from "../services/editTax.service";
import saveTaxService from "../services/saveTax.service";

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

const initialValues: TaxData = {
    id: "",
    tax: "",
    percentage: 0,
    status: ""
}

const validationSchema = Yup.object<TaxData>().shape({
    tax: Yup.string().required("El nomrbe del impuesto es obligatorio"),
    percentage: Yup.number().required("El impuesto es obligatorio"),
    status: Yup.string().required("El estado es obligatorio"),
});

function FormTax({ onSubmitSuccess, onCancel, selectedTax }:
    {
        onSubmitSuccess: () => void,
        onCancel: () => void,
        selectedTax: TaxData | null
    }) {
    const { classes } = useStyles();
    const [loading, setLoading] = useState(false);
    const idRef = useRef<string>(selectedTax?.id || "");



    const form = useForm({
        initialValues: idRef.current && selectedTax !== null ?
            { ...selectedTax} :
            initialValues,
        validate: yupResolver(validationSchema)
    })



    const handleSubmit = async (formTax: TaxData) => {
        setLoading(true)
        formTax.status = formTax.status as boolean
        if (idRef.current !== "") {
            const res = await editTaxService(idRef.current, formTax)
            if (res.error || res.data == null) return setLoading(false)
            SnackbarManager.success("Impuesto editado exitosamente")
        } else {
            const res = await saveTaxService(formTax)
            if (res.error || res.data == null) return setLoading(false)
            SnackbarManager.success("Immpuesto creado exitosamente")
        }
        setLoading(false)
        onSubmitSuccess()
        onCancel();
    }

    return (
        <Flex direction="column" p="lg">

            <Text className={classes.title} align="center" mb="lg">{idRef.current ? "Editar Impuesto" : "Crear Impuesto"}</Text>
            <form onSubmit={form.onSubmit(handleSubmit)} >
                <Flex direction="column" gap="lg">

                    <TextInput
                        withAsterisk
                        label="Nombre del Impuesto"
                        {...form.getInputProps("tax")}
                    />

                    <NumberInput
                    withAsterisk
                    decimalSeparator=","
                    thousandsSeparator="."
                    label="Porcentaje"
                    defaultValue={0.00}
                    precision={2}
                    step={0.5}
                    inputMode="numeric"
                    min={0}
                    
                    {...form.getInputProps("percentage")}
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

export default FormTax