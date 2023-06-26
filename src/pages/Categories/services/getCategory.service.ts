import API from "../../../lib/API";
import {  ProductCategory } from "../../../models";
import { EndPoints } from "../../../utils";
import { ResponseRequest } from "./getCategories.service";

export interface OneCategoryResponse extends ResponseRequest {
    data: ProductCategory
}


export default async function getCategoryService(id: string) {
    const url = `${EndPoints.CATEGORY}/${id}`;
    const res = await API.get<OneCategoryResponse>({ url });
    return res;
}