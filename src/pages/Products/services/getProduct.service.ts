import API from "../../../lib/API";
import { Product, ResponseRequest, } from "../../../models";
import { EndPoints } from "../../../utils";

export async function getProductService(id: string) {
    const url = `${EndPoints.PRODUCT}/${id}`;
    const res = await API.get<ResponseRequest<Product>>({ url });
    return res;
}