import API from "../../../lib/API";
import { ProductCategory } from "../../../models";
import { EndPoints } from "../../../utils";

export default async function deleteCategoryService(id: string) {
    const url = `${EndPoints.CATEGORY}/${id}`;
    const res = await API.del<ProductCategory>({ url });
    return res;
}