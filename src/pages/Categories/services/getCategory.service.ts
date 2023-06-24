import API from "../../../lib/API";
import {  ProductCategory } from "../../../models";
import { ResponseRequest } from "./getCategories.service";

export interface OneCategoryResponse extends ResponseRequest {
    data: ProductCategory
}


const URL = "/protected/category"
export default async function getCategoryService(id: string) {
    const url = `${URL}/${id}`;
    const res = await API.get<OneCategoryResponse>({ url });
    return res;
}