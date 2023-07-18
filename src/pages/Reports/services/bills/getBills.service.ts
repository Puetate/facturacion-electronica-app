import API from "../../../../lib/API";
import { Bill, ResponseRequest } from "../../../../models";
import { EndPoints } from "../../../../utils";



export async function getBillsService() {
    const res = await API.get<ResponseRequest<Bill[]>>({ url: EndPoints.BILLS });
    return res;
}