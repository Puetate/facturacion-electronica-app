import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AdminRoutes, superRoutes, UserRoutes } from "../models";
import { useSessionStore } from "../store";

const allowedRoutes = {
	admin: Object.values(AdminRoutes),
	super: Object.values(superRoutes),
	user: Object.values(UserRoutes),
};

const defaultRoutes = {
	admin: AdminRoutes.reports,
	super: superRoutes.companies,
	user: UserRoutes.sales
}

export default function RequireAuth() {
	const { token, user } = useSessionStore();
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {	
		if (!token) return navigate("/");
	}, [token]);

	return allowedRoutes[user.rol].includes(location.pathname) &&
		user.state
		? (
		<Outlet />
	) : (
		<Navigate replace to={defaultRoutes[user.rol]} />
	);
}
