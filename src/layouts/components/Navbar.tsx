import {
	Box,
	createStyles,
	getStylesRef,
	Group,
	Image,
	Navbar as MantineNavbar,
	rem,
} from "@mantine/core";
import {
	IconBuildingSkyscraper,
	IconChartDots2,
	IconCube,
	IconDiscount,
	IconPackageImport,
	IconReceipt2,
	IconReceiptRefund,
	IconReceiptTax,
	IconShoppingBag,
	IconUsersGroup,
	IconUserShield,
} from "@tabler/icons-react";
import { AdminRoutes, superRoutes, UserRoutes } from "../../models";
import { useSessionStore } from "../../store";
import { useLayout } from "../hooks";
import CapyBills from "../assets/capyBills.svg";
import { LinksGroup, LinksGroupProps } from "./LinksGroup";
import Footer from "./Footer";
import { useEffect, useState } from "react";


const useStyles = createStyles((theme) => ({
	navbar: {
		display: "flex",
		flexDirection: "column",
	},
	image: {
		maxWidth: "5rem",
		marginLeft: "auto",
		marginRight: "auto",
		marginBottom: "1rem ",
		marginTop: "1rem ",
	},
	linksContainer: {
		display: "flex",
		flexDirection: "column",
	},
	link: {
		textDecoration: "none",
	},
	linkActive: {
		"&, &:hover": {
			backgroundColor: "#C0CEFF81",
		},
	},
	footer: {
		borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
			}`,
		paddingTop: theme.spacing.md,
	},
	linkIcon: {
		ref: getStylesRef('icon'),
		color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
		marginRight: theme.spacing.sm,
	},
	header: {
		paddingBottom: theme.spacing.md,
		marginBottom: `calc(${theme.spacing.md} * 1.5)`,
		borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
			}`,
	},
}));



const linksUser: LinksGroupProps[] = [
	{ label: "Ventas", icon: IconReceipt2, links: [{ label: "Ventas", link: UserRoutes.sales }] },
	{ label: "Nota de Crédito", icon: IconReceiptRefund, links: [{ label: "", link: UserRoutes.creditNote }] },
	{
		label: "Inventario", icon: IconCube, initiallyOpened: false, links: [
			{ label: "Productos", link: UserRoutes.products },
			{ label: "Categorías", link: UserRoutes.categories },

		],
	},

	{ label: "Clientes", icon: IconUsersGroup, links: [{ label: "", link: UserRoutes.clients }] },
];

const linksAdmin: LinksGroupProps[] = [
	{ label: "Reportes", icon: IconChartDots2, links: [{ label: "", link: AdminRoutes.reports }] },
	{
		label: "Inventario", icon: IconCube, initiallyOpened: false, links: [
			{ label: "Productos", link: AdminRoutes.products },
			{ label: "Categorías", link: AdminRoutes.categories },

		],
	},
	{ label: "Impuesto", icon: IconReceiptTax, links: [{ label: "", link: AdminRoutes.tax }] },
	{ label: "Clientes", icon: IconUsersGroup, links: [{ label: "", link: AdminRoutes.clients }] },
	{ label: "Proveedores", icon: IconPackageImport, links: [{ label: "", link: AdminRoutes.providers }] }, //IconTruckReturn
	{ label: "Compras", icon: IconShoppingBag, links: [{ label: "", link: AdminRoutes.purchases }] },
	{ label: "Promociones", icon: IconDiscount, links: [{ label: "", link: AdminRoutes.promotions }] },
	{ label: "Usuarios", icon: IconUserShield, links: [{ label: "", link: AdminRoutes.users }] },
];

const linksSuper: LinksGroupProps[] = [
	{ label: "Compañías", icon: IconBuildingSkyscraper, links: [{ label: "", link: superRoutes.companies }] },
];

const navBarsLinks = {
	user: linksUser,
	ADMINISTRADOR: linksAdmin,
	super: linksSuper
}

export default function Navbar() {
	const { user } = useSessionStore();
	const { classes, theme } = useStyles();
	const [links, setLinks] = useState<LinksGroupProps[]>([]);
	const { opened } = useLayout();


	const getLinks = () => {
		setLinks(navBarsLinks[user.rol])
	}

	useEffect(() => {
		getLinks();
	}, [])


	return (
		<MantineNavbar
			hiddenBreakpoint="sm"
			hidden={!opened}
			bg={theme.colors.whiteSmoke[6]}
			width={{ sm: "11rem", lg: "13.5rem" }}
			className={classes.navbar}

		>


			<MantineNavbar.Section grow>
				<Group className={classes.header} position="apart">
					<Image src={CapyBills} className={classes.image} />

				</Group>
				<Box className={classes.linksContainer}>
					{links.map((item) => <LinksGroup {...item} key={item.label} />)}
				</Box>
			</MantineNavbar.Section>
			<Footer />
		</MantineNavbar>

	);
}
