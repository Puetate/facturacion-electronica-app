export enum AdminType {
	ADMIN = "admin",
	SUPER = "super",
}

export enum AdminState {
	ACTIVE = "activo",
	INACTIVE = "inactivo",
}

export interface Admin {
	_id?: string;
	name: string;
	surname: string;
	email: string;
	password?: string;
	type: AdminType;
	state: AdminState;
}
