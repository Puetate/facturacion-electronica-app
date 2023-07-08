import API from "../../../lib/API";
import { Category } from "../../../models";
import { EndPoints } from "../../../utils";

export async function deleteCategoryService(id: string) {
    const url = `${EndPoints.CATEGORY}/${id}`;
    const res = await API.del<Category>({ url });
    return res;
}