import { Button, Flex, Select, Text, TextInput, createStyles } from "@mantine/core"
import { useRef, useState } from "react";
import { State, Supplier, } from "../../../models";
import { SnackbarManager, validateIdentification } from "../../../utils";
import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import { editSupplierService, saveSupplierService } from "../services";



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

const initialValues: Supplier = {
    id: "",
    name: "",
    address: "",
    email: "",
    identification: "",
    telephone: "",
    status: ""
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

const validationSchema = Yup.object<Supplier>().shape({
    identification: Yup.string().required("La identificación es obligatoria").min(10).max(13).test("validate-identification", "Ingrese una identificación correcta", val => validateIdentification(val)),
    name: Yup.string().required("El nombre es obligatorio"),
    address: Yup.string().required("La dirección es obligatorio"),
    email: Yup.string().required("El email es obligatorio"),
    telephone: Yup.string().required("El teléfono es obligatorio"),
    status: Yup.string().required("El estado es obligatorio"),

});


function FormSupplier({ onSubmitSuccess, onCancel, selectedSupplier }:
    {
        onSubmitSuccess: () => void,
        onCancel: () => void,
        selectedSupplier: Supplier | null
    }) {
    const { classes } = useStyles();
    const [loading, setLoading] = useState(false);
    const idRef = useRef<string>(selectedSupplier?.id || "");


    const form = useForm({
        initialValues: idRef.current && selectedSupplier !== null ?
            { ...selectedSupplier } :
            initialValues,
        validate: yupResolver(validationSchema)
    })



    const handleSubmit = async (formSupplier: Supplier) => {
        setLoading(true)
        formSupplier.status = formSupplier.status as boolean
        if (idRef.current !== "") {
            const res = await editSupplierService(idRef.current, formSupplier)
            if (res.error || res.data == null) return setLoading(false)
            SnackbarManager.success("Categoría editada exitosamente")
        } else {
            const res = await saveSupplierService(formSupplier)
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
                        disabled={(idRef.current != "") ? true : false}
                        color="black"
                        withAsterisk
                        label="Identificación"
                        {...form.getInputProps("identification")}
                    />

                    <TextInput
                        withAsterisk
                        label="Nombre"
                        {...form.getInputProps("name")}
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

export default FormSupplier