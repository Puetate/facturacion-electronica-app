import API from "../../../lib/API";
import { ProductCategory } from "../../../models";
import { CategoryData } from "../components/CategoryTable";

const URL = "/"
export default async function editCategoryService(id: string, category: CategoryData) {
    const url = `${URL}/${id}`;
    const res = await API.patch<ProductCategory>({ url, data: category })
    return res
} 