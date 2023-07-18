import API from "../../../lib/API";
import { User, ResponseRequest } from "../../../models";
import { EndPoints } from "../../../utils";
import { UserData } from "../components/UsersTable";

export async function saveUserService(user: UserData) {
    const res = await API.post<ResponseRequest<User>>({ url: EndPoints.USER, data: user });
    return res;
}