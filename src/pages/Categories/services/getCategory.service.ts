import API from "../../../lib/API";
import {  Category, ResponseRequest, } from "../../../models";
import { EndPoints } from "../../../utils";



export async function getCategoryService(id: string) {
    const url = `${EndPoints.CATEGORY}/${id}`;
    const res = await API.get<ResponseRequest<Category>>({ url });
    return res;
}