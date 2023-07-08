import API from "../../../lib/API";
import { Product, ResponseRequest } from "../../../models";
import { EndPoints } from "../../../utils";

export async function deleteProductService(id: string) {
    const url = `${EndPoints.PRODUCT}/${id}`;
    const res = await API.del<ResponseRequest<Product>>({ url });
    return res;
}