import { Button, Flex, Select, Text, TextInput, createStyles } from "@mantine/core"
import { useEffect, useRef, useState } from "react";
import { State, PaymentMethods, } from "../../../models";
import { SnackbarManager } from "../../../utils";
import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import { editPaymentMethodService, savePaymentMethodService } from "../services";



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

const initialValues: PaymentMethods = {
    id: "",
    payment: "",
    status: ""
}

const validationSchema = Yup.object<PaymentMethods>().shape({
    payment: Yup.string().required("El método de pago es obligatorio"),
    status: Yup.string().required("El estado es obligatorio"),

});


function FormPaymentMethod({ onSubmitSuccess, onCancel, selectedPaymentMethods }:
    {
        onSubmitSuccess: () => void,
        onCancel: () => void,
        selectedPaymentMethods: PaymentMethods | null
    }) {
    const { classes } = useStyles();
    const [loading, setLoading] = useState(false);
    const idRef = useRef<string>(selectedPaymentMethods?.id || "");


    const form = useForm({
        initialValues: idRef.current && selectedPaymentMethods !== null ?
            { ...selectedPaymentMethods } :
            initialValues,
        validate: yupResolver(validationSchema)
    })

    const handleSubmit = async (formPaymentMethods: PaymentMethods) => {
        setLoading(true)
        formPaymentMethods.status = formPaymentMethods.status as boolean
        if (idRef.current !== "") {
            const res = await editPaymentMethodService(idRef.current, formPaymentMethods)
            if (res.error || res.data == null) return setLoading(false)
            SnackbarManager.success("Categoría editada exitosamente")
        } else {
            const res = await savePaymentMethodService(formPaymentMethods)
            if (res.error || res.data == null) return setLoading(false)
            SnackbarManager.success("Categoría creada exitosamente")
        }
        setLoading(false)
        onSubmitSuccess()
        onCancel();
    }
    


    return (
        <Flex direction="column" p="lg">

            <Text className={classes.title} align="center" mb="lg">{idRef.current ? "Editar Categoría" : "Crear Categoría"}</Text>
            <form onSubmit={form.onSubmit(handleSubmit)} >
                <Flex direction="column" gap="lg">
                    <TextInput
                        withAsterisk
                        label="Método de pago"
                        {...form.getInputProps("payment")}
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

export default FormPaymentMethod