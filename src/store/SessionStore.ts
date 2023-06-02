import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Admin, AdminState, AdminType } from "../models";

interface SessionState {
	admin: Admin;
	setAdmin: (admin: Admin) => void;
	token: string;
	setToken: (token: string) => void;
	logout: () => void;
}

const initialAdmin: Admin = {
	_id: "",
	email: "",
	name: "",
	surname: "",
	type: AdminType.ADMIN,
	state: AdminState.ACTIVE
};

export const useSessionStore = create(
	persist<SessionState>(
		(set) => ({
			admin: initialAdmin,
			setAdmin: (admin: Admin) => set(() => ({ admin: admin })),
			token: "",
			setToken: (token: string) => set(() => ({ token: token })),
			logout: () => {
				set(() => ({ token: "", admin: initialAdmin }));
				useSessionStore.persist.clearStorage();
			},
		}),
		{
			name: "pmv-auth",
		},
	),
);
