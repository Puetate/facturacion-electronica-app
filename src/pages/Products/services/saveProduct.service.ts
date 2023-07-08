import API from "../../../lib/API";
import { Product, ResponseRequest } from "../../../models";
import { EndPoints } from "../../../utils";
import { ProductData } from "../components/ProductTable";

export async function saveProductService(product: ProductData) {
    const res = await API.post<ResponseRequest<Product>>({ url: EndPoints.PRODUCT, data: product });
    return res;
}