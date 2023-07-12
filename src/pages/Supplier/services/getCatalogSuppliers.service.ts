import API from "../../../lib/API";
import { Catalog, ResponseRequest, Supplier } from "../../../models";
import { EndPoints } from "../../../utils";


export async function getCatalogSuppliersService() {
    const res = await API.get<ResponseRequest<Supplier[]>>({ url: EndPoints.SUPPLIER });
    if (res.error || res.data === null) return null

    const catalog: Catalog[] = res.data.data.map(item => (
        {
            value: item.id!,
            label: item.name
        }
    ));
    return catalog;
}