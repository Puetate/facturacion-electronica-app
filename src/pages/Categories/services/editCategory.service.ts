import API from "../../../lib/API";
import { EndPoints } from "../../../utils";
import { CategoryData } from "../components/CategoryTable";

export default async function editCategoryService(id: string, category: CategoryData) {
    const url = `${EndPoints.CATEGORY}/${id}`;
    const res = await API.patch<CategoryData>({ url, data: category })
    return res
} 