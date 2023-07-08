import API from "../../../lib/API";
import { Category, ResponseRequest } from "../../../models";
import { EndPoints } from "../../../utils";
import { Catalog } from "../../Tax/services/getCatalogTax.service";


export async function getCatalogCategoryService() {
    const res = await API.get<ResponseRequest<Category[]>>({ url: EndPoints.CATEGORY });
    if (res.error || res.data === null) return null

    const catalog: Catalog[] = res.data.data.map(item => (
        {
            value: item.id || "",
            label: item.category
        }
    ));
    return Object.values(catalog);
}