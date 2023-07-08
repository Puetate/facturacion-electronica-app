import API from "../../../lib/API";
import { Category, ResponseRequest } from "../../../models";
import { EndPoints } from "../../../utils";
import { CategoryData } from "../components/CategoryTable";

export async function editCategoryService(id: string, category: CategoryData) {
    const url = `${EndPoints.CATEGORY}/${id}`;
    const res = await API.patch<ResponseRequest<Category>>({ url, data: category })
    return res
} 