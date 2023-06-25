import API from "../../../lib/API";
import { ProductCategory } from "../../../models";
import { EndPoints } from "../../../utils";

export interface ResponseRequest {
    httpStatus: string,
    message: string,
}
export interface CategoryResponse extends ResponseRequest {
    data: ProductCategory[]
}

export default async function getCategoriesService() {
    const res = await API.get<CategoryResponse>({ url: EndPoints.CATEGORY });
    return res;
}