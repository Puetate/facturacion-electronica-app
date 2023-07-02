import API from "../../../lib/API";
import { Promotion, ResponseRequest } from "../../../models";
import { EndPoints } from "../../../utils";

export async function getPromotionService(id: string) {
    const url = `${EndPoints.PROMOTION}/${id}`;
    const res = await API.get<ResponseRequest<Promotion>>({ url });
    return res;
}