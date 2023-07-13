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
import { Company, CompanyType, EnvironmentType, PublicRoutes } from "../../../models";
import loginImg from "./../../../assets/image_1.png";
import { registerService } from "../services";
import { SnackbarManager } from "../../../utils";

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


const initialValues: Company = {
	id_company: "",
	name: "",
	email: "",
	ruc: "",
	phone: "",
	address: "",
	accounting: true,
	type: CompanyType.EMPTY,
	environment: EnvironmentType.PRUEBA,
	logo: "",
};

const validationSchema = Yup.object<Company>().shape({
	name: Yup.string().required("El nombre es obligatorio"),
	email: Yup.string().required("El email es obligatorio").email("Correo invalido"),
	ruc: Yup.string().required("El ruc es obligatorio"),
	phone: Yup.string().required("El teléfono es obligatorio"),
	address: Yup.string().required("La dirección es obligatorio"),
	type: Yup.string().required("El tipo de empresa es obligatorio"),
	environment: Yup.string().required("El tipo de ambiente es obligatorio"),
	accounting: Yup.boolean(),
});

export default function FormRegister() {
	const { classes } = useStyles();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const dataTypesCompanies = [
		{ value: CompanyType.NATURAL, label: CompanyType.NATURAL },
		{ value: CompanyType.JURIDICA, label: CompanyType.JURIDICA },
	];
	const dataTypesEnvironment = [
		{ value: EnvironmentType.PRODUCTION, label: EnvironmentType.PRODUCTION },
		{ value: EnvironmentType.PRUEBA, label: EnvironmentType.PRUEBA }
	];

	const form = useForm({
		initialValues,
		validate: yupResolver(validationSchema),
	});

	const handleSubmit = async (company: Company) => {
		setLoading(true);
		const res = await registerService(company);
		if (res.error || res == null) return setLoading(false);
		SnackbarManager.success(res.data?.message!);
		SnackbarManager.success("Se ha enviado una contraseña temporal a su email para poder iniciar sesión");
		navigate(PublicRoutes.login);
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
								withAsterisk
								label="RUC"
								placeholder="XXXXXXXXXX001"
								{...form.getInputProps("ruc")}
							/>
							<TextInput
								withAsterisk
								label="Nombre de la Empresa"
								{...form.getInputProps("name")}
							/>

							<Select
								withAsterisk
								label="Tipo de Empresa"
								placeholder="Seleccione"
								data={dataTypesCompanies}
								transitionProps={{ transition: 'pop-top-left', duration: 100, timingFunction: 'ease' }}
								withinPortal
								{...form.getInputProps("type")}

							/>
							<TextInput
								withAsterisk
								label="Correo Electrónico"
								placeholder="correo@correo.com"
								{...form.getInputProps("email")}
							/>
							<TextInput
								withAsterisk
								label="Teléfono"
								placeholder="09XXXXXXXX"
								{...form.getInputProps("phone")}
							/>
						</Box>
						<Space h="sm" />

						<Box className={classes.columnsForm}>
							<TextInput
								withAsterisk
								label="Dirección"
								{...form.getInputProps("address")}
							/>
							<Select
								withAsterisk
								label="Tipo de Ambiente"
								placeholder="Seleccione"
								data={dataTypesEnvironment}
								transitionProps={{ transition: 'pop-top-left', duration: 100, timingFunction: 'ease' }}
								withinPortal
								{...form.getInputProps("environment")}

							/>
							<FileInput label="Upload files" placeholder="Upload files" accept="image/png,image/jpeg,vector/svg" />
							<Space h="" />
							<Switch  labelPosition="left" label="Obligado a llevar contabilidad" onLabel="SI" offLabel="NO" {...form.getInputProps("accounting",)} />
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
