import { Company } from ".";

export enum UserRoles {
	VENDEDOR = "VENDEDOR",
	ADMINISTRADOR = "ADMINISTRADOR",
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
	password: string
}
