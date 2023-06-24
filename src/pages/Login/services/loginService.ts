import API from "../../../lib/API";
import { User, UserRoles } from "../../../models";
import { Credentials } from "../components/FormLogin";

export interface authorities{
	authority:UserRoles
}

export interface UserAuth extends User{
    authorities:authorities[]
}
export interface UserAuthResponse {
    data: {
        user: UserAuth
        token: string
    }
}

const URL = "/public/auth/login";
export default async function loginService(credentials: Credentials) {
    const res = await API.post<UserAuthResponse>({ url: URL, data: credentials });
    return res
}
