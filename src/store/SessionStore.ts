import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, Company, CompanyType, EnvironmentType, UserRoles } from "../models";

interface SessionState {
	user: User;
	setUser: (user: User) => void;
	token: string;
	setToken: (token: string) => void;
	logout: () => void;
}

const initialCompany: Company = {
	id_company: "",
	city: "",
	ruc: "",
	type: CompanyType.EMPTY,
	name: "",
	email: "",
	phone: "",
	logo: "",
	environment: EnvironmentType.TEST,
	accounting: false
}
const initialUser: User = {
	id_user: "",
	company: initialCompany,
	email: "alex@correo.com",
	fullName: "Alex Tigselema",
	identificación: "",
	phone: "",
	rol: UserRoles.SUPER,
	state: false
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
