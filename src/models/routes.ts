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

export interface SuperRoutes{
	companies: string;
}

export const publicRoutes: PublicRoutes = {
	default: "/",
	login: "/login",
	register: "/register",
};

export const userRoutes: UserRoutes = {
	sales: "/sales",
	creditNote: "/creditNote",
	products: "/products",
	categories: "/categories",
	clients: "/clients",
};

export const adminRoutes: AdminRoutes = {
	products: "/products",
	categories: "/categories",
	tax: "/tax",
	clients: "/clients",
	providers: "/providers",
	purchases: "/purchases",
	promotions: "/promotions",
	reports: "/reports",
	users: "/users",
};

export const superRoutes: SuperRoutes = {
	companies: "/admin/companies",
};
