import { Button, Flex, Select, Text, TextInput, createStyles } from "@mantine/core";
import { State, UserRoles } from "../../../models";
import * as Yup from "yup";
import { UserData } from "./UsersTable";
import { useRef, useState } from "react";
import { useForm, yupResolver } from "@mantine/form";
import { SnackbarManager } from "../../../utils";
import { editUserService } from "../services/editUser.service";
import { saveUserService } from "../services/saveUser.service";

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

export const itemRoles = [
    { value: "ADMINISTRADOR", label: UserRoles.ADMIN },
    { value: "USUARIO", label: UserRoles.USER },
];


const initialValues: UserData = {
    id: "",
	company: "",
	identification: "",
	email: "",
	fullName: "",
	status: "",
	role: "",
	telephone: "",
}

const validationSchema = Yup.object<UserData>().shape({
    identification: Yup.string().required("La identificación es obligatoria"),
    email: Yup.string().required("El correo es obligatorio"),
    fullName: Yup.string().required("El nombre completo es obligatorio"),
    status: Yup.string().required("La estado es obligatorio"),
    role: Yup.string().required("La estado es obligatorio"),
    telephone: Yup.string().required("El teléfono es obligatorio"),
});

function FormUser({ onSubmitSuccess, onCancel, selectedUser }:
    {
        onSubmitSuccess: () => void,
        onCancel: () => void,
        selectedUser: UserData | null
    }) {
    const { classes } = useStyles();
    const [loading, setLoading] = useState(false);
    const idRef = useRef<string>(selectedUser?.id || "");


    const form = useForm({
        initialValues: idRef.current && selectedUser !== null ?
            { ...selectedUser } :
            initialValues,
        validate: yupResolver(validationSchema)
    })


    const handleSubmit = async (formUser: UserData) => {
        setLoading(true)

        formUser.status = formUser.status as boolean
        if (idRef.current !== "") {
            const res = await editUserService(idRef.current, formUser)
            if (res.error || res.data == null) return setLoading(false)
            SnackbarManager.success("Usuario editado exitosamente")
        } else {
            const res = await saveUserService(formUser)
            if (res.error || res.data == null) return setLoading(false)
            SnackbarManager.success("Usuario creado exitosamente")
        }
        setLoading(false)
        onSubmitSuccess()
        onCancel();
    }


    return (
        <Flex direction="column" p="lg">

            <Text className={classes.title} align="center" mb="lg">{idRef.current ? "Editar Producto" : "Crear Producto"}</Text>
            <form  >
                <Flex direction="column" gap="md">
                    <TextInput
                        withAsterisk
                        disabled={(idRef.current != "") ? true : false}
                        label="Identificación"
                        {...form.getInputProps("identification")}
                    />
                    <TextInput
                        withAsterisk
                        disabled={(idRef.current != "") ? true : false}
                        label="Nombres Completos"
                        {...form.getInputProps("fullName")}
                    />
                    <TextInput
                        disabled={(idRef.current != "") ? true : false}
                        width="1"
                        withAsterisk
                        label="Correo"
                        {...form.getInputProps("email")}
                    />

                    <TextInput
                        withAsterisk
                        label="Teléfono"
                        {...form.getInputProps("telephone")}
                    />

                    <Select
                        withAsterisk
                        label="Rol"
                        placeholder="Seleccione"
                        data={itemRoles}
                        {...form.getInputProps("role")}
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

export default FormUser