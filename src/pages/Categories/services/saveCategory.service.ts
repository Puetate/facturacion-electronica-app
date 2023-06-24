import API from "../../../lib/API";
import { ProductCategory } from "../../../models";
import { CategoryData } from "../components/CategoryTable";

const URL = "/protected/category"
export default async function saveCategoryService(category: CategoryData) {
    const res = await API.post<ProductCategory>({ url: URL, data: category });
    return res;
}