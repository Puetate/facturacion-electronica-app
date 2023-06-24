import {
	Box,
	Button,
	PasswordInput,
	Text,
	createStyles,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useState } from "react";
import * as Yup from "yup";
import { SnackbarManager } from "../../utils";
import changePasswordAdminService from "../services/changePasswordService";
import { useSessionStore } from "../../store";

const useStyles = createStyles((theme) => ({
	formContainer: {
		maxHeight: "29rem",
		minWidth: "23rem",
		borderRadius: "1rem",
		padding: ".5rem 1rem 2rem 1rem ",
	},
	title: {
		textTransform: "uppercase",
		fontWeight: "bold",
		color: theme.colors.green[6],
		marginBottom: ".5rem",
	},
	description: {
		fontWeight: "normal",
		color: theme.colors.green[2],
		marginTop: ".2rem",
		marginBottom: ".2rem",
	},
	form: {
		display: "flex",
		flexDirection: "column",
		gap: ".5rem",
	},
	input: {
		borderColor: "green",
		":focus": {
			borderColor: "green",
		},
		":focus-within": {
			borderColor: "green",
		},
	},

	button: {
		marginTop: "1rem",
		textTransform: "uppercase",
	},
}));

export interface ChangePasswordAdmin {
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
}

const defaultValues: ChangePasswordAdmin = {
	oldPassword: "",
	newPassword: "",
	confirmPassword: "",
};

export default function FormChangePassword({
	onSubmitSuccess,
}: { onSubmitSuccess: () => void }) {
	const { user: admin } = useSessionStore();
	const { classes } = useStyles();
	const [loading, setLoading] = useState(false);

	const validationSchema = Yup.object<ChangePasswordAdmin>().shape({
		oldPassword: Yup.string().required("Anterior Contraseña es obligatorio"),
		newPassword: Yup.string()
			.required("Nueva Contraseña es obligatorio")
			.min(6, "La contraseña debe ser como mínimo de 6 caracteres"),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref("newPassword"), ''], "Las contraseñas deben coincidir")
			.required("Confirmar contraseña es obligatorio")
			.min(6, "La contraseña debe ser como mínimo de 6 caracteres"),
	});

	const form = useForm({
		initialValues: defaultValues,
		validate: yupResolver(validationSchema),
	});

	const handleSubmit = async (changePasswordAdmin: ChangePasswordAdmin) => {
		setLoading(true);
		const res = await changePasswordAdminService(changePasswordAdmin, admin)
		if (res.error || res == null) return setLoading(false);
		SnackbarManager.success("Se ha cambiado su contraseña exitosamente");
		setLoading(false);
		onSubmitSuccess();
	};

	return (
		<Box className={classes.formContainer}>
			<Text align="center" className={classes.title}>
				Cambiar Contraseña
			</Text>
			<form onSubmit={form.onSubmit(handleSubmit)} className={classes.form}>
				<PasswordInput
					classNames={classes}
					label="Anterior Contraseña"
					placeholder="******"
					{...form.getInputProps("oldPassword")}
				/>
				<PasswordInput
					classNames={classes}
					label="Nueva Contraseña"
					placeholder="******"
					{...form.getInputProps("newPassword")}
				/>
				<PasswordInput
					classNames={classes}
					label="Confirmar Contraseña"
					placeholder="******"
					{...form.getInputProps("confirmPassword")}
				/>
				<Button
					className={classes.button}
					color="green"
					type="submit"
					loading={loading}
				>
					Cambiar
				</Button>
			</form>
		</Box>
	);
}
