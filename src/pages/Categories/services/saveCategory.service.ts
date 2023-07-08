import API from "../../../lib/API";
import { ResponseRequest } from "../../../models";
import { EndPoints } from "../../../utils";
import { CategoryData } from "../components/CategoryTable";

export async function saveCategoryService(category: CategoryData) {
    const res = await API.post<ResponseRequest<CategoryData>>({ url: EndPoints.CATEGORY, data: category });
    return res;
}