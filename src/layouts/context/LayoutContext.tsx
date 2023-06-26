import { createContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { AdminRoutes, superRoutes, UserRoutes } from "../../models";

export interface LayoutState {
	opened: boolean;
	setOpened: (opened: ((o: boolean) => boolean) | boolean) => void;
	title: string;
	setTitle: (title: ((o: string) => string) | string) => void;
}

const initialLayoutState: LayoutState = {
	opened: false,
	setOpened: () => { },
	title: "Inicio",
	setTitle: () => { },
};

const TITLE_PATH = {
	[superRoutes.companies]: "Compañías",
	[UserRoutes.categories]: "Categorías",
	[UserRoutes.clients]: "Clientes",
	[UserRoutes.creditNote]: "Nota de Crédito",
	[UserRoutes.products]: "Productos",
	[UserRoutes.sales]: "Ventas",
	[AdminRoutes.promotions]: "Promociones",
	[AdminRoutes.providers]: "Proveedores",
	[AdminRoutes.purchases]: "Compras",
	[AdminRoutes.categories]: "Categorías",
	[AdminRoutes.products]: "Productos",
	[AdminRoutes.reports]: "Reportes",
	[AdminRoutes.tax]: "Impuesto",
	[AdminRoutes.users]: "Usuarios",
};

export const LayoutContext = createContext<LayoutState>(initialLayoutState);

export const LayoutProvider = ({ children }: { children: JSX.Element }) => {
	const location = useLocation();
	const [opened, setOpened] = useState<boolean>(initialLayoutState.opened);
	const [title, setTitle] = useState<string>(TITLE_PATH[location.pathname]);

	return (
		<LayoutContext.Provider value={{ opened, setOpened, title, setTitle }}>
			{children}
		</LayoutContext.Provider>
	);
};
