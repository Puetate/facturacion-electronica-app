import API from "../../../lib/API";
import { EndPoints } from "../../../utils";
import { CategoryData } from "../components/CategoryTable";

export default async function saveCategoryService(category: CategoryData) {
    const res = await API.post<CategoryData>({ url: EndPoints.CATEGORY, data: category });
    return res;
}