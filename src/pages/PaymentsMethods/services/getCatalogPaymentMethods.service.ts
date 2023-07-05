import API from "../../../lib/API";
import { PaymentMethods, ResponseRequest } from "../../../models";
import { EndPoints } from "../../../utils";
import { Catalog } from "../../Tax/services/getCatalogTax.service";


export async function getCatalogCategoryService() {
    const res = await API.get<ResponseRequest<PaymentMethods[]>>({ url: EndPoints.PAYMENT });
    if (res.error || res.data === null) return null

    const catalog: Catalog[] = res.data.data.map(item => (
        {
            value: item.id!,
            label: item.paymentMethod
        }
    ));
    return Object.values(catalog);
}