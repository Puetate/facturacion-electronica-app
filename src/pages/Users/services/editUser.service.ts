import API from "../../../lib/API";
import { ResponseRequest, User } from "../../../models";
import { EndPoints } from "../../../utils";
import { UserData } from "../components/UsersTable";

export async function editUserService(id: string, user: UserData) {
    const url = `${EndPoints.USER}/update/${id}`;
    const res = await API.patch<ResponseRequest<User>>({ url: url, data: user })
    return res
} 