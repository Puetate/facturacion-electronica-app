import {
	Box,
	Button,
	Image,
	Modal,
	PasswordInput,
	Text,
	TextInput,
	createStyles,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { User, UserRoutes } from "../../../models";
import { useSessionStore } from "../../../store";
import loginImg from "./../../../assets/image_1.png";
import { useDisclosure } from "@mantine/hooks";
import { FormRecoveryPassword } from ".";
import loginService from "../services/loginService";

const useStyles = createStyles((theme) => ({
	formContainer: {
		backgroundColor: theme.colors.white,
		minHeight: "25rem",
		minWidth: "23rem",
		maxWidth: "10rem",
		borderRadius: "1rem",
		padding: "1rem",
	},
	title: {
		textTransform: "uppercase",
		fontSize: "1.2rem",
		fontWeight: "bold",
		marginBottom: ".7rem",
		marginTop: ".7rem",
	},
	image: {
		maxWidth: "13rem",
		margin: "0 auto .2rem auto",
	},
	form: {
		display: "flex",
		flexDirection: "column",
		gap: ".5rem",
	},

	innerInput: {
		color: theme.colors.blue[6],
	},
	button: {
		marginTop: "1rem",
		textTransform: "uppercase",
	},
	buttonText: {

		maxWidth: "1rem"

	}
}));

export interface Credentials {
	email: string;
	password: string;
}

const initialValues: Credentials = {
	email: "",
	password: "",
};

const validationSchema = Yup.object<Credentials>().shape({
	email: Yup.string().required().email("Correo invalido"),
	password: Yup.string()
		.required()
		.min(6, "La contraseña debe ser como mínimo de 6 caracteres"),
});

export default function FormLogin() {
	const { setUser, setToken } = useSessionStore();
	const { classes } = useStyles();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const [opened, { open, close }] = useDisclosure(false);

	const form = useForm({
		initialValues,
		validate: yupResolver(validationSchema),
	});

	const onSubmitSuccess = () => {
		close();
	};



	const handleSubmit = async (credentials: Credentials) => {
		setLoading(true);
		const res = await loginService(credentials);
		if (res.error || res == null) return setLoading(false);
		const auth = res.data!.data;
		const user: User = {
			id: auth.user.id,
			company: auth.user.company,
			identification: auth.user.identification,
			email: auth.user.email,
			fullName: auth.user.fullName,
			status: auth.user.status,
			rol: auth.user.authorities[0].authority,
			telephone: auth.user.telephone,
		}
		setUser(user);
		setToken(auth.token);
		await timeout(500);
		navigate(UserRoutes.sales);
		setLoading(false);
	};

	function timeout(delay: number) {
		return new Promise(res => setTimeout(res, delay));
	}

	const onClickRecoveryPassword = () => {
		open();
	};

	return (
		<>

			<Box className={classes.formContainer}>

				<Image src={loginImg} className={classes.image} />
				<Text align="center" className={classes.title}>
					Sistema de Facturación Electronica
				</Text>
				<form onSubmit={form.onSubmit(handleSubmit)} className={classes.form}>
					<TextInput
						label="Correo Electrónico"
						placeholder="correo@correo.com"
						{...form.getInputProps("email")}
					/>
					<PasswordInput
						classNames={classes}
						label="Contraseña"
						placeholder="******"
						{...form.getInputProps("password")}
					/>
					<Button
						className={classes.button}
						color="green"
						type="submit"
						loading={loading}
					>
						Ingresar
					</Button>
					<Button variant="subtle" color="dark" onClick={onClickRecoveryPassword}>
						Recuperar Contraseña
					</Button>

				</form>
				<Modal withCloseButton={false} radius="lg" padding="xs" opened={opened} onClose={close} centered>
					<FormRecoveryPassword onSubmitSuccess={onSubmitSuccess} />
				</Modal>
			</Box>
		</>
	);
}
