import API from "../../../lib/API";
import { EndPoints } from "../../../utils";
import { PromotionData } from "../components/PromotionTable";


export default async function savePromotionService(promotion: PromotionData) {
    const res = await API.post<PromotionData>({ url: EndPoints.PROMOTION, data: promotion });
    return res;
}