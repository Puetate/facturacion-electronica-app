import API from "../../../lib/API";
import { Tax } from "../../../models";
import { EndPoints } from "../../../utils";
import { ResponseRequest } from "./getTaxs.service";

export interface OneTaxResponse extends ResponseRequest {
    data: Tax
}


export default async function getTaxService(id: string) {
    const url = `${EndPoints.TAX}/${id}`;
    const res = await API.get<OneTaxResponse>({ url });
    return res;
}