import API from "../../../lib/API";
import { ResponseRequest, User, } from "../../../models";
import { EndPoints } from "../../../utils";

export async function getUserService(id: string) {
    const url = `${EndPoints.USER}/${id}`;
    const res = await API.get<ResponseRequest<User>>({ url });
    return res;
}