import { Button, Flex, Select, Text, TextInput, createStyles } from "@mantine/core"
import { useRef, useState } from "react";
import { State, Client, TypeClient, } from "../../../models";
import { SnackbarManager, validateIdentification } from "../../../utils";
import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";



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

export const typeClient = [
    { value: TypeClient.NATURAL, label: TypeClient.NATURAL },
    { value: TypeClient.JURIDICO, label: TypeClient.JURIDICO },
];

const initialValues: Client = {
    id: "",
    fullName: "",
    address: "",
    email: "",
    identification: "",
    telephone: "",
    type: TypeClient.NATURAL,
    status: "true"
}

Yup.addMethod(Yup.string, "validateIdentification", function (errorMessage) {
    return this.test(`identification-validate`, errorMessage, function (value) {
        const { path, createError } = this;

        return (
            (value && validateIdentification(value)) ||
            createError({ path, message: errorMessage })
        );
    });
});

const validationSchema = Yup.object<Client>().shape({
    identification: Yup.string().required("La identificación es obligatoria").min(10).max(13).test("validate-identification", "Ingrese una identificación correcta", val => validateIdentification(val)),
    fullName: Yup.string().required("El nombre es obligatorio"),
    address: Yup.string().required("La dirección es obligatorio"),
    email: Yup.string().required("El email es obligatorio"),
    telephone: Yup.string().required("El teléfono es obligatorio"),
    type: Yup.string().required("El tipo de cliente es obligatorio"),
    status: Yup.string().required("El estado es obligatorio"),

});


function FormClient({ onSubmitSuccess, onCancel, selectedClient }:
    {
        onSubmitSuccess: () => void,
        onCancel: () => void,
        selectedClient: Client | null
    }) {
    const { classes } = useStyles();
    const [loading, setLoading] = useState(false);
    const idRef = useRef<string>(selectedClient?.id || "");


    const form = useForm({
        initialValues: idRef.current && selectedClient !== null ?
            { ...selectedClient } :
            initialValues,
        validate: yupResolver(validationSchema)
    })



    const handleSubmit = async (formClient: Client) => {
        setLoading(true)
        formClient.status = formClient.status as boolean
        /* if (idRef.current !== "") {
            const res = await editClientService(idRef.current, formClient)
            if (res.error || res.data == null) return setLoading(false)
            SnackbarManager.success("Categoría editada exitosamente")
        } else {
            const res = await saveClientService(formClient)
            if (res.error || res.data == null) return setLoading(false)
            SnackbarManager.success("Categoría creada exitosamente")
        } */
        setLoading(false)
        onSubmitSuccess()
        onCancel();
    }


    return (
        <Flex direction="column" p="lg">

            <Text className={classes.title} align="center" mb="lg">{idRef.current ? "Editar Cliente" : "Crear Cliente"}</Text>
            <form onSubmit={form.onSubmit(handleSubmit)} >
                <Flex direction="column" gap="lg">
                    <TextInput
                        disabled={(idRef.current != "") ? true : false}
                        color="black"
                        withAsterisk
                        label="Identificación"
                        {...form.getInputProps("identification")}
                    />

                    <TextInput
                        withAsterisk
                        label="Nombre"
                        {...form.getInputProps("fullName")}
                    />
                    <TextInput
                        withAsterisk
                        label="Email"
                        {...form.getInputProps("email")}
                    />
                    <TextInput
                        withAsterisk
                        label="Dirección"
                        {...form.getInputProps("address")}
                    />
                    <TextInput
                        withAsterisk
                        label="Teléfono"
                        {...form.getInputProps("telephone")}
                    />

                    <Select
                        withAsterisk
                        label="Tipo de cliente"
                        placeholder="Seleccione"
                        data={typeClient}
                        {...form.getInputProps("type")}
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

export default FormClient