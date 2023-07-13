import API from "../../../lib/API";
import { Promotion, ResponseRequest } from "../../../models";
import { Catalog } from "../../Tax/services/getCatalogTax.service";


const URL = "/protected/promotion"
export async function getCatalogPromotionsService() {
    const res = await API.get<ResponseRequest<Promotion[]>>({ url: URL });
    if (res.error || res.data === null) return null
    
    const catalog: Catalog[] = res.data.data.filter(item => (item.status)).map(item => (
        {
            value: item.id || "",
            label: `${item.description} ${item.value}%`
        }
    ));
    return catalog;
}