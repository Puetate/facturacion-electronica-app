import API from "../../../lib/API";
import { Product } from "../../../models";
import { EndPoints } from "../../../utils";
import { Catalog } from "../../Tax/services/getCatalogTax.service";
import { ResponseRequest } from "./getCategories.service";

export interface ProductResponse extends ResponseRequest {
    data: Product[]
}

export default async function getCatalogCategoryService() {
    const res = await API.get<ProductResponse>({ url: EndPoints.CATEGORY });
    if (res.error || res.data === null) return null

    const catalog: Catalog[] = res.data.data.map(item => (
        {
            value: item.id || "",
            label: item.category
        }
    ));
    return Object.values(catalog);
}