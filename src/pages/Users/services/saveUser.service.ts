import API from "../../../lib/API";
import { User, ResponseRequest } from "../../../models";
import { EndPoints } from "../../../utils";
import { UserData } from "../components/UsersTable";

export async function saveUserService(companyId: string ,user: UserData) {
    const url = `${EndPoints.USER}/create/${companyId}`;
    console.log(url);
    const res = await API.post<ResponseRequest<User>>({ url: url, data: user });
    return res;
}