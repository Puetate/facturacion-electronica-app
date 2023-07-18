import API from "../../../lib/API";
import { Client, ResponseRequest } from "../../../models";
import { EndPoints } from "../../../utils";

const URL = `${EndPoints.CLIENT}/identification`;
export async function getClientByIdentificationService(identification: string) {
    const url = `${URL}/${identification}`
    const res = API.get<ResponseRequest<Client>>({ url });
    return res;
}