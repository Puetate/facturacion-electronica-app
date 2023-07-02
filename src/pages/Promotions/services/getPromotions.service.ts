import API from "../../../lib/API";
import { Promotion, ResponseRequest } from "../../../models";
import { EndPoints } from "../../../utils";


export async function getPromotionsService() {
    const res = await API.get<ResponseRequest<Promotion[]>>({ url: EndPoints.PROMOTION });
    return res;
}