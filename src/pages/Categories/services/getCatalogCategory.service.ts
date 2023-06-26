import API from "../../../lib/API";
import { ProductCategory } from "../../../models";
import { EndPoints } from "../../../utils";
import { Catalog } from "../../Tax/services/getCatalogTax.service";


export default async function getCatalogCategoryService() {
    const res = await API.get<ProductCategory[]>({ url: EndPoints.CATEGORY });
    if (res.error || res.data === null) return

    const catalog: Catalog[] = res.data.map(item => (
        {
            value: item.id || "",
            label: item.category
        }
    ));
    return Object.values(catalog);
}