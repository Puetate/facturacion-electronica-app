import API from "../../../lib/API";
import { Promotion } from "../../../models";
import { EndPoints } from "../../../utils";

export interface ResponseRequest {
    httpStatus: string,
    message: string,
}
export interface PromotionResponse extends ResponseRequest {
    data: Promotion[]
}

export default async function getPromotionService() {
    const res = await API.get<PromotionResponse>({ url: EndPoints.PROMOTION });
    return res;
}