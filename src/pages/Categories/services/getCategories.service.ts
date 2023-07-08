import API from "../../../lib/API";
import { Category, ResponseRequest } from "../../../models";
import { EndPoints } from "../../../utils";

export async function getCategoriesService() {
    const res = await API.get<ResponseRequest<Category[]>>({ url: EndPoints.CATEGORY });
    return res;
}