import API from "../../../lib/API";
import { Product, ResponseRequest } from "../../../models";
import { EndPoints } from "../../../utils";

export async function getProductsService() {
    const res = await API.get<ResponseRequest<Product[]>>({ url: EndPoints.PRODUCT });
    return res;
}