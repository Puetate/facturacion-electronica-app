import { Company } from ".";

export enum UserRoles {
	USER = "user",
	ADMIN = "ADMINISTRADOR",
	SUPER = "super",
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
	rol: UserRoles,
	telephone: string,
}
