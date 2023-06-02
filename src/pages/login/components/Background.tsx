import { Box, Button, Container, createStyles } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { publicRoutes } from "../../../models";

const useStyles = createStyles((theme) => ({
	backgroundContainer: {
		height: "90%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	background: {
		height: "100%",
		maxWidth: "100%",
		backgroundColor: theme.colors.blue[6]
	},
	containerButton: {
		display: "flex",
		justifyContent: "end"
	},
	button: {
		marginTop: "1rem",
		textTransform: "uppercase",
		backgroundColor: theme.colors.blue[4]
	},

}));



export default function Background({ children }: { children: JSX.Element | JSX.Element[] }) {
	const { classes } = useStyles();
	const navigate = useNavigate();


	function handleClickRegister() {
		navigate(publicRoutes.register)
	}
	return (
		<Container className={classes.background} >
			<Box className={classes.containerButton} >
				<Button className={classes.button} color="gray" onClick={handleClickRegister}>
					Regístrate
				</Button>
			</Box>
			<Container className={classes.backgroundContainer} >{children}</Container>
		</Container>
	);
}
