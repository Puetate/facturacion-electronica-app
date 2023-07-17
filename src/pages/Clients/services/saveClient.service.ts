import API from "../../../lib/API";
import { Client } from "../../../models";
import { EndPoints } from "../../../utils";

export async function saveClientService(client: Client) {
    const res = await API.post<Client>({ url: EndPoints.CLIENT, data: client });
    return res;
}