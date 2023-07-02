import API from "../../../lib/API";
import { ResponseRequest, Tax } from "../../../models";

export interface Catalog {
    value: string,
    label: string,
}


const URL = "/protected/tax"
export default async function getCatalogTaxService() {
    const res = await API.get<ResponseRequest<Tax[]>>({ url: URL });
    if (res.error || res.data === null) return null

    const catalog: Catalog[] = res.data.data.map(item => (
        {
            value: item.id || "",
            label: item.tax+ ` ${item.percentage}% `
        }
    ));
    return catalog;
}