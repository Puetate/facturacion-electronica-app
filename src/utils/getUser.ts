import { User } from "../models";
import { UserAuthResponse } from "../pages/Login/services/loginService";

export const getUser = (auth: UserAuthResponse) => {
    const res = auth.data;

    const user: User = {
        id: res.user.id,
        company: res.user.company,
        identification: res.user.identification,
        email: res.user.email,
        fullName: res.user.fullName,
        status: res.user.status,
        role: res.user.authorities[0].authority,
        telephone: res.user.telephone,
    }
    return user;
}