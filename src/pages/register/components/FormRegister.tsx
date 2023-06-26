import {
	Box,
	Button,
	FileInput,
	Image,
	Select,
	Space,
	Switch,
	Text,
	TextInput,
	createStyles,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { superRoutes } from "../../../models";
import { useSessionStore } from "../../../store";
import loginImg from "./../../../assets/image_1.png";
import { loginService } from "../../Login";

const useStyles = createStyles((theme) => ({
	formContainer: {
		backgroundColor: theme.colors.white,
		minHeight: "30rem",
		minWidth: "40rem",
		maxWidth: "100rem",
		borderRadius: "1rem",
		padding: "1rem",
		display: "flex",
		flexDirection: "row",
		//justifyContent:"space-between"

	},
	title: {
		textTransform: "uppercase",
		fontSize: "1rem",
		fontWeight: "bold",
		marginBottom: ".7rem",
		marginTop: ".7rem",
	},
	image: {
		maxWidth: "17rem",
		margin: "0 auto .2rem auto",

	},
	form: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		gap: ".5rem",
		alignContent: "center",
		alignItems: "center"

	},
	formContain: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		gap: ".3rem",
		[theme.fn.smallerThan("sm")]: {
			flexDirection: "column",
		}
	},

	columnsForm: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		gap: ".5rem",

	},
	contentImage: {
		display: "flex",
		alignContent: "center",
		alignItems: "center",
		margin: ".7rem"
	},


	innerInput: {
		color: theme.colors.blue[6],
	},
	button: {
		maxWidth: "30rem",
		minWidth: "20rem",
		marginTop: "1rem",
		textTransform: "uppercase",
	},
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

export default function FormRegister() {
	const { setUser: setAdmin, setToken } = useSessionStore();
	const { classes } = useStyles();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const dataTypesCompanies = ['Tecnología', 'Comida', 'Market', 'Bisutería', 'Otro'];
	const dataTypesEnvironment = ['Prueba', 'Producción'];

	const form = useForm({
		initialValues,
		validate: yupResolver(validationSchema),
	});

	const handleSubmit = async (credentials: Credentials) => {
		setLoading(true);
		const res = await loginService(credentials);
		if (res.error || res == null) return setLoading(false);
		setAdmin(res.admin);
		setToken(res.token);
		navigate(superRoutes.companies);
		setLoading(false);
	};


	return (
		<>

			<Box className={classes.formContainer}>

				<Box className={classes.contentImage} >
					<Box>
						<Image src={loginImg} height={300} radius={"lg"} className={classes.image} />
						<Text align="center" className={classes.title} >
							Sistema de Facturación Electronica
						</Text>
					</Box>
				</Box>
				<form onSubmit={form.onSubmit(handleSubmit)} className={classes.form}>
					<Text className={classes.title} align="center">
						Registrar Empresa
					</Text>
					<Box className={classes.formContain}>
						<Box className={classes.columnsForm}>
							<TextInput
								label="RUC"
								placeholder="XXXXXXXXXX001"
								{...form.getInputProps("email")}
							/>
							<TextInput
								label="Nombre de la Empresa"
								{...form.getInputProps("email")}
							/>

							<Select
								label="Tipo de Empresa"
								placeholder="Seleccione"
								data={dataTypesCompanies}
								transitionProps={{ transition: 'pop-top-left', duration: 100, timingFunction: 'ease' }}
								withinPortal
							/>
							<TextInput
								label="Correo Electrónico"
								placeholder="correo@correo.com"
								{...form.getInputProps("email")}
							/>
							<TextInput
								label="Teléfono"
								placeholder="09XXXXXXXX"
								{...form.getInputProps("email")}
							/>
						</Box>
						<Space h="sm" />

						<Box className={classes.columnsForm}>
							<TextInput
								label="Dirección"
								{...form.getInputProps("email")}
							/>
							<Select
								withAsterisk
								label="Tipo de Ambiente"
								placeholder="Seleccione"
								data={dataTypesEnvironment}
								transitionProps={{ transition: 'pop-top-left', duration: 100, timingFunction: 'ease' }}
								withinPortal
							/>
							<FileInput label="Upload files" placeholder="Upload files" accept="image/png,image/jpeg,vector/svg" />
							<Space h="" />
							<Switch labelPosition="left" label="Obligado a llevar contabilidad" onLabel="SI" offLabel="NO" />
						</Box>
					</Box>
					<Button

						className={classes.button}
						radius="md"
						color="green"
						type="submit"
						loading={loading}
					>
						registrarse
					</Button>

				</form>
			</Box>
		</>
	);
}
