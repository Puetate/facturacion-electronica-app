import API from "../../../lib/API";
import { Product, ResponseRequest, User } from "../../../models";
import { EndPoints } from "../../../utils";
import { UserData } from "../components/UsersTable";

export async function editUserService(id: string, user: UserData) {
    const url = `${EndPoints.USER}/${id}`;
    const res = await API.patch<ResponseRequest<User>>({ url, data: user })
    return res
} 