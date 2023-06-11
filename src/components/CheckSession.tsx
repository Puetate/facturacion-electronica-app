import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PublicRoutes } from "../models";
import { useSessionStore } from "../store";

const allowedRoutes = Object.values(PublicRoutes) as string[];

export default function CheckSession() {
	const { token } = useSessionStore();
	const location = useLocation();

	return token === "" ? (
		<Outlet />
	) : allowedRoutes.includes(location.pathname) ? (
		<Navigate to={AppRoutes.SEND_ROUTINES} />
	) : (
		<Navigate to={PublicRoutes.default} />
	);
}
