import {
	Box,
	Button,
	Text,
	TextInput,
	createStyles,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import {  useState } from "react";
import { SnackbarManager } from "../../../utils";
import * as Yup from "yup";

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
		marginBottom: ".5rem",
		marginTop:0
	},
	description: {
		fontWeight: "normal",
		color: theme.colors.black[2],
		marginTop: ".2rem",
		marginBottom: ".2rem",
	},
	form: {
		display: "flex",
		flexDirection: "column",
		gap: ".5rem",
	},
	input: {
		borderColor: theme.colors.blue[6],
		":focus": {
			borderColor: theme.colors.blue[6],
		},
		":focus-within": {
			borderColor: theme.colors.blue[6],
		},
	},

	button: {
		marginTop: "1rem",
		textTransform: "uppercase",
	},
}));

export interface Email {
	email: string;
}

const defaultValues : Email = {
	email: "",
};

export default function FormRecoveryPassword({
	onSubmitSuccess,
}: { onSubmitSuccess: () => void }) {
	const { classes } = useStyles();
	const [loading, setLoading] = useState(false);

	const validationSchema = Yup.object<Email>().shape({
		email: Yup.string().required().email("Correo invalido"),
	});

	const form = useForm({
		initialValues: defaultValues,
		validate: yupResolver(validationSchema),
	});

	const handleSubmit = async (email:Email) => {
		setLoading(true);
		SnackbarManager.success("Se ha enviado una contraseña temporal a su Email");
		setLoading(true);
		onSubmitSuccess();
	};

	return (
		<Box className={classes.formContainer}>
			<Text align="center" className={classes.title}>
				Recuperar Contraseña
			</Text>
			<Text align="start" className={classes.description}>
				Sera enviará una contraseña temporal a su correo electrónico.
			</Text>
			<form onSubmit={form.onSubmit(handleSubmit)} className={classes.form}>
				<TextInput
					classNames={classes}
					label="Correo"
					placeholder="correo@correo.com"
					{...form.getInputProps("email")}
				/>
				<Button
					className={classes.button}
					color="green"
					type="submit"
					loading={loading}
				>
					Recuperar
				</Button>
			</form>
		</Box>
	);
}
