import API from "../../../lib/API";
import { User, ResponseRequest } from "../../../models";
import { EndPoints } from "../../../utils";

export async function getUsersService(companyId: string) {
    const url = `${EndPoints.USER}/${companyId}`;
    const res = await API.get<ResponseRequest<User[]>>({url});
    return res;
}