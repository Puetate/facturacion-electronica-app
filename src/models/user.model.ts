import { Company } from ".";

export enum UserRoles {
	USER = "USUARIO",
	ADMIN = "ADMINISTRADOR",
	SUPER = "SUPER",
}

export enum State {
	ACTIVE = "ACTIVO",
	INACTIVE = "INACTIVO",
}

export const enumUserState = Object.values(State);

export interface User {
	id: string,
	company: Company,
	identification: string,
	email: string,
	fullName: string,
	status: boolean,
	role: UserRoles,
	telephone: string,
}
