import API from "../../../lib/API";
import { Tax } from "../../../models";
import { EndPoints } from "../../../utils";

export interface ResponseRequest {
    httpStatus: string,
    message: string,
}
export interface TaxResponse extends ResponseRequest {
    data: Tax[]
}

export default async function getTaxService() {
    const res = await API.get<TaxResponse>({ url: EndPoints.TAX });
    return res;
}