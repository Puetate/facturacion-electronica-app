import API from "../../../lib/API";
import { EndPoints } from "../../../utils";
import { PromotionData } from "../components/PromotionTable";

export default async function editPromotionService(id: string, promotion: PromotionData) {
    const url = `${EndPoints.PROMOTION}/${id}`;
    const res = await API.patch<PromotionData>({ url, data: promotion })
    return res
} 