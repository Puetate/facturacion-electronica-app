import { Button, Flex, NumberInput, Select, Text, TextInput, createStyles } from "@mantine/core";
import { State } from "../../../models";
import { PromotionData } from "./PromotionTable";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import { useForm, yupResolver } from "@mantine/form";
import { SnackbarManager } from "../../../utils";
import editPromotionService from "../services/editPromotion.service";
import savePromotionService from "../services/savePromotion.service";

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

const initialValues: PromotionData = {
    id: "",
    description:"",
    value:0,
    status: ""
}

const validationSchema = Yup.object<PromotionData>().shape({
    description:  Yup.string().required("El nombre de la promoción es obligatoria"),
    value: Yup.number().required("El valor es obligatorio"),
    status: Yup.string().required("El estado es obligatorio"),
});

function FormPromotion({ onSubmitSuccess, onCancel, selectedPromotion }:
    {
        onSubmitSuccess: () => void,
        onCancel: () => void,
        selectedPromotion: PromotionData | null
    }) {
    const { classes } = useStyles();
    const [loading, setLoading] = useState(false);
    const idRef = useRef<string>(selectedPromotion?.id || "");



    const form = useForm({
        initialValues: idRef.current && selectedPromotion !== null ?
            { ...selectedPromotion } :
            initialValues,
        validate: yupResolver(validationSchema)
    })



    const handleSubmit = async (formPromotion: PromotionData) => {
        setLoading(true)
        formPromotion.status = formPromotion.status as boolean
        if (idRef.current !== "") {
            const res = await editPromotionService(idRef.current, formPromotion)
            if (res.error || res.data == null) return setLoading(false)
            SnackbarManager.success("Promoción editada exitosamente")
        } else {
            const res = await savePromotionService(formPromotion)
            if (res.error || res.data == null) return setLoading(false)
            SnackbarManager.success("Promoción creada exitosamente")
        }
        setLoading(false)
        onSubmitSuccess()
        onCancel();
    }

    return (
        <Flex direction="column" p="lg">

            <Text className={classes.title} align="center" mb="lg">{idRef.current ? "Editar Promoción" : "Crear Promoción"}</Text>
            <form onSubmit={form.onSubmit(handleSubmit)} >
                <Flex direction="column" gap="lg">
                    <TextInput
                        withAsterisk
                        label="Nombre de la Promoción"
                        {...form.getInputProps("description")}
                    />

                    <NumberInput
                        withAsterisk
                        decimalSeparator=","
                        thousandsSeparator="."
                        label="Valor"
                        defaultValue={0.00}
                        precision={2}
                        step={0.5}
                        inputMode="numeric"
                        min={0}
                        
                        {...form.getInputProps("value")}
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

export default FormPromotion