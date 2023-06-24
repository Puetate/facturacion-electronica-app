import API from "../../../lib/API";
import { ProductCategory } from "../../../models";

export interface ResponseRequest {
    httpStatus: string,
    message: string,
}
export interface CategoryResponse extends ResponseRequest {
    data: ProductCategory[]
}

const URL = "/protected/category"
export default async function getCategoriesService() {
    const res = await API.get<CategoryResponse>({ url: URL });
    return res;
}