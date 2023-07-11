
import {
  Box,
  TextInput,
  Text,
  createStyles,
  Center,
  Grid,
  Col,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSessionStore } from "../../store";
import { Company, CompanyType, EnvironmentType } from "../../models";

const useStyles = createStyles((theme) => ({
  formContainer: {
    maxHeight: "45rem",
    minWidth: "33rem",
    borderRadius: "2rem",
    padding: ".0.2rem 1rem 1rem 2rem ",
  },
  title: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: theme.colors.blue[6],
    marginBottom: ".3rem",
    marginTop: ".1rem",
  },
  description: {
    fontWeight: "normal",
    color: theme.colors.blue[2],
    marginTop: ".2rem",
    marginBottom: ".2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: ".4rem",
  },
  input: {
    borderColor: "blue",
    ":focus": {
      borderColor: "blue",
    },
    ":focus-within": {
      borderColor: "blue",
    },
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "0.2rem",
  },
  logo: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "50%",
  },
}));

const defaultValues: Company = {
  id_company: "",
  city: "",
  ruc: "",
  type: CompanyType.EMPTY as CompanyType,
  name: "",
  email: "",
  phone: "",
  logo: "",
  environment: EnvironmentType.PRODUCTION as EnvironmentType,
  accounting: false,
};


export default function FormInformation({
  onSubmitSuccess,
}: {
  onSubmitSuccess: () => void;
}) {
  const { user: admin } = useSessionStore();
  const { classes } = useStyles();


  const form = useForm({
    initialValues: admin ? admin.company : defaultValues,
  });


  const companyTypeOptions = Object.values(CompanyType);
  const environmentTypeOptions = Object.values(EnvironmentType);


  return (
    <Box className={classes.formContainer}>
      <Text align="center" className={classes.title}>
        Datos de la Empresa
      </Text>
      <Center className={classes.logoContainer}>
        {form.values.logo ? (
          <img
            src="https://img.freepik.com/iconos-gratis/usuario_318-875902.jpg"
            alt="Logo"
            className={classes.logo}
          />
        ) : (
          <img
            src="https://www.heladospinguino.com.ec/content/dam/unilever/heart/ecuador/website/logo_pinguino-1900870-png.png"
            alt="Logo"
            className={classes.logo}
          />
        )}
      </Center>
      <form className={classes.form}>
        <TextInput
          classNames={classes}
          label="RUC"
          {...form.getInputProps("ruc")}
          disabled
        />

        <TextInput
          classNames={classes}
          label="Nombre de la Empresa"
          {...form.getInputProps("name")}
          disabled
        />
        <TextInput
          classNames={classes}
          label="Correo Electrónico"
          {...form.getInputProps("email")}
          disabled
        />

        <Grid>
          <Col span={6}>
            <TextInput
              classNames={classes}
              label="Ciudad"
              {...form.getInputProps("address")}
              disabled
            />
          </Col>
          <Col span={6}>
            <TextInput
              classNames={classes}
              label="Teléfono"
              {...form.getInputProps("phone")}
              disabled
            />
          </Col>
        </Grid>

        <Select
          classNames={classes}
          label="Tipo de Empresa"
          value={form.values.type}
          onChange={(value) => form.setValues({ ...form.values, type: value as CompanyType })}
          data={companyTypeOptions}
          disabled
        />
        <Grid gutter="md" >
          <Col span={6}>
            <Select
              classNames={classes}
              label="Tipo de Ambiente"
              value={form.values.environment}
              onChange={(value) => form.setValues({ ...form.values, environment: value as EnvironmentType })}
              data={environmentTypeOptions}
              disabled
            />
          </Col>
          <Col span={6}
            style={{ marginBottom: '30px' }}>
            <Select
              classNames={classes}
              label="Contabilidad"
              value={form.values.accounting ? "yes" : "no"}
              onChange={(value) => form.setValues({ ...form.values, accounting: value === "yes" })}
              data={[
                { value: "yes", label: "Sí" },
                { value: "no", label: "No" },
              ]}
              disabled
            />
          </Col>
        </Grid>
      </form>
    </Box>
  );
}