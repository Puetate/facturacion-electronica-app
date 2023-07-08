import API from "../../../lib/API";
import { Product, ResponseRequest } from "../../../models";
import { EndPoints } from "../../../utils";
import { ProductData } from "../components/ProductTable";

export async function editProductService(id: string, product: ProductData) {
    const url = `${EndPoints.PRODUCT}/${id}`;
    const res = await API.patch<ResponseRequest<Product>>({ url, data: product })
    return res
} 