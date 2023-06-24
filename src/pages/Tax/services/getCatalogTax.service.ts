import API from "../../../lib/API";
import { Tax } from "../../../models";
import { ResponseRequest } from "../../Categories/services/getCategories.service";

export interface Catalog {
    value: string,
    label: string,
}

export interface TaxResponse extends ResponseRequest {
    data: Tax[]
}

const URL = "/protected/tax"
export default async function getCatalogTaxService() {
    const res = await API.get<TaxResponse>({ url: URL });
    if (res.error || res.data === null) return null

    const catalog: Catalog[] = res.data.data.map(item => (
        {
            value: item.id || "",
            label: item.tax+ ` ${item.percentage}% `
        }
    ));
    return catalog;
}