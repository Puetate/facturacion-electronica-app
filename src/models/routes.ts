export interface PublicRoutes {
	default: string;
	login: string;
	register: string;
}

export interface UserRoutes {
	sales: string;
	creditNote: string;
	products: string;
	categories: string;
	clients: string;
}

export interface AdminRoutes {
	products: string;
	categories: string;
	tax: string;
	clients: string;
	providers: string;
	purchases: string;
	promotions: string;
	reports: string;
	users: string;
}

export interface SuperRoutes {
	companies: string;
}

export const PublicRoutes: PublicRoutes = {
	default: "/",
	login: "/login",
	register: "/register",
};

export const UserRoutes: UserRoutes = {
	sales: "/sales",
	creditNote: "/sales/creditNote",
	products: "/sales/products",
	categories: "/sales/categories",
	clients: "/sales/clients",
};

export const AdminRoutes: AdminRoutes = {
	reports: "/reports",
	products: "/reports/products",
	categories: "/reports/categories",
	tax: "/reports/tax",
	clients: "/reports/clients",
	providers: "/reports/providers",
	purchases: "/reports/purchases",
	promotions: "/reports/promotions",
	users: "/reports/users",
};

export const superRoutes: SuperRoutes = {
	companies: "/admin/companies",
};
