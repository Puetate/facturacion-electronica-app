import API from "../../../lib/API";
import { Promotion } from "../../../models";
import { EndPoints } from "../../../utils";
import { ResponseRequest } from "./getPromotions.service";

export interface OnePromotionResponse extends ResponseRequest {
    data: Promotion
}


export default async function getPromotionService(id: string) {
    const url = `${EndPoints.PROMOTION}/${id}`;
    const res = await API.get<OnePromotionResponse>({ url });
    return res;
}