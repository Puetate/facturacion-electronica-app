import API from "../../../lib/API";
import { EndPoints } from "../../../utils";
import { CategoryRequest } from "./saveCategory.service";

export default async function editCategoryService(id: string, category: CategoryRequest) {
    const url = `${EndPoints.CATEGORY}/${id}`;
    const res = await API.patch<CategoryRequest>({ url, data: category })
    return res
} 