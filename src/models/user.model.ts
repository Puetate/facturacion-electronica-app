import { Company } from ".";

export enum UserRoles {
	USER = "user",
	ADMIN = "admin",
	SUPER = "super",
}

export enum UserState {
	ACTIVE = "activo",
	INACTIVE = "inactivo",
}

export interface User {
	id_user?: string,
	company: Company,
	identification:string,
	email: string,
	fullName: string,
	password?: string,
	state: boolean,
	rol: UserRoles,
	phone:string,
}
