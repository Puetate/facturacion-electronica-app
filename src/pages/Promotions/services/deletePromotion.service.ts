import API from "../../../lib/API";
import { Promotion } from "../../../models";
import { EndPoints } from "../../../utils";

export default async function deletePromotionService(id: string) {
    const url = `${EndPoints.PROMOTION}/${id}`;
    const res = await API.del<Promotion>({ url });
    return res;
}