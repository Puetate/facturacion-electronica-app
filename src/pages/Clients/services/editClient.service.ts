import API from "../../../lib/API";
import { Client } from "../../../models";
import { EndPoints } from "../../../utils";

export async function editClientService(id: string, Client: Client) {
    const url = `${EndPoints.CLIENT}/${id}`;
    const res = await API.patch<Client>({ url, data: Client })
    return res
} 