import API from "../../../lib/API";
import { Promotion } from "../../../models";
import { ResponseRequest } from "../../Categories/services/getCategories.service";
import { Catalog } from "../../Tax/services/getCatalogTax.service";

export interface TaxResponse extends ResponseRequest {
    data: Promotion[]
}

const URL = "/protected/promotion"
export default async function getCatalogTaxService() {
    const res = await API.get<TaxResponse>({ url: URL });
    if (res.error || res.data === null) return null

    const catalog: Catalog[] = res.data.data.map(item => (
        {
            value: item.id || "",
            label: `${item.description} ${item.value}%`
        }
    ));
    return catalog;
}