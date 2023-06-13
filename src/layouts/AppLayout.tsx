import { AppShell, Container, createStyles } from "@mantine/core";
import { Outlet } from "react-router-dom";
import {  Navbar } from "./components";
import { LayoutProvider } from "./context";

const useStyles = createStyles((theme) => ({
	container: {
		maxWidth: "100%",
		height: "100%",
		padding: "1rem",
		backgroundColor: theme.colors.background[0],
	},
}));

export default function AppLayout() {
	const { classes } = useStyles();
	return (
		<LayoutProvider>
			<AppShell
				padding={0}
				navbarOffsetBreakpoint="sm"
				asideOffsetBreakpoint="sm"
				navbar={<Navbar />}
				
			>
				<Container className={classes.container}>
					<Outlet />
				</Container>
			</AppShell>
		</LayoutProvider>
	);
}
