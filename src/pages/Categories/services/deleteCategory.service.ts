import API from "../../../lib/API";
import { ProductCategory } from "../../../models";

const URL = "/"
export default async function deleteCategoryService(id: string) {
    const url = `${URL}/${id}`;
    const res = await API.del<ProductCategory>({ url });
    return res;
}