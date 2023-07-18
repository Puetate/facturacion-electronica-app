import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, CompanyType, EnvironmentType, UserRoles } from "../models";

interface SessionState {
	user: User;
	setUser: (user: User) => void;
	token: string;
	setToken: (token: string) => void;
	logout: () => void;
}

const initialUser: User = {
	id: "",
	company: {
		id_company: "",
		address: "",
		ruc: "",
		type: CompanyType.EMPTY,
		name: "",
		email: "",
		phone: "",
		logo: "",
		environment: EnvironmentType.PRODUCTION,
		accounting: false
	},
	email: "",
	fullName: "",
	identification: "",
	telephone: "",
	role: UserRoles.ADMIN,
	status: false,

};

export const useSessionStore = create(
	persist<SessionState>(
		(set) => ({
			user: initialUser,
			setUser: (user: User) => set(() => ({ user: user })),
			token: "",
			setToken: (token: string) => set(() => ({ token: token })),
			logout: () => {
				set(() => ({ token: "", user: initialUser }));
				useSessionStore.persist.clearStorage();
			},
		}),
		{
			name: "capyBills-auth",
		},
	),
);
