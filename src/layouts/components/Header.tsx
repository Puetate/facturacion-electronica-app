import {
	ActionIcon,
	Box,
	Burger,
	Image,
	Header as MantineHeader,
	Menu,
	Modal,
	Text,
	createStyles,
} from "@mantine/core";
import { IconChevronDown, IconLogout, IconLockOpen } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "../../models";
import { useSessionStore } from "../../store";
import CapyBills from "../assets/capyBills.svg";
import { useLayout } from "../hooks";
import { useDisclosure } from "@mantine/hooks";
import FormChangePassword from "./FormChangePassword";

const useStyles = createStyles((theme) => ({
	icon: {
		maxWidth: 60,
		[theme.fn.smallerThan("md")]: {
			maxWidth: 40,
		},
		[theme.fn.smallerThan("sm")]: {
			display: "none",
		},
	},
	burgerIcon: {
		[theme.fn.largerThan("sm")]: {
			display: "none",
		},
	},
	title: {
		color: theme.colors.white[0],
		fontSize: "1.5rem",
		[theme.fn.smallerThan("sm")]: {
			display: "none",
		},
	},
	userConfigContainer: {
		display: "flex",
		alignItems: "center",
	},
	userName: {
		color: theme.colors.white[0],
		fontSize: "1.2rem",
	},
	headerContent: {
		display: "flex",
		alignItems: "center",
		height: "100%",
		justifyContent: "space-between",
	},
}));

export default function Header() {
	const { classes } = useStyles();
	const { user: admin, logout } = useSessionStore();
	const adminName = `${admin.name} ${admin.surname}`;
	const navigate = useNavigate();
	const { opened, setOpened, title } = useLayout();
	const [openedForm, { open, close }] = useDisclosure(false);

	const handleClickBurger = () => setOpened((o: boolean) => !o);
	const handleLogout = () => {
		navigate(PublicRoutes.login);
		logout();
	};

	const onSubmitSuccess = () => {
		close();
	};

	const onClickChangePassword = () => {
		open();
	};

	return (
		<MantineHeader height={{ base: 50, md: 70 }} p="md" bg="green">
			<Box className={classes.headerContent}>
				<Burger
					className={classes.burgerIcon}
					color="white"
					opened={opened}
					onClick={handleClickBurger}
					size="sm"
					mr="xl"
				/>
				<Image src={CapyBills} className={classes.icon} />
				<Text className={classes.title}>{title}</Text>
				<Box className={classes.userConfigContainer}>
					<Text className={classes.userName}>{adminName}</Text>
					<Menu position="bottom-end">
						<Menu.Target>
							<ActionIcon variant="transparent" color="white">
								<IconChevronDown size="1.4rem" />
							</ActionIcon>
						</Menu.Target>
						<Menu.Dropdown>
							<Menu.Item icon={<IconLockOpen />} onClick={onClickChangePassword}>
								Cambiar Contraseña
							</Menu.Item>
							<Menu.Item icon={<IconLogout />} onClick={handleLogout}>
								Cerrar Sesión
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</Box>
				<Modal
					radius="lg"
					padding="xs"
					opened={openedForm}
					onClose={close}
					centered
				>
					<FormChangePassword onSubmitSuccess={onSubmitSuccess} />
				</Modal>
			</Box>
		</MantineHeader>
	);
}
