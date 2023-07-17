import API from "../../../lib/API";
import { Client, ResponseRequest } from "../../../models";
import { EndPoints } from "../../../utils";

export async function getClientsService() {
    const res = await API.get<ResponseRequest<Client[]>>({ url: EndPoints.CLIENT });
    return res;
}