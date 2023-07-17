import API from "../../../lib/API";
import { Supplier } from "../../../models";
import { EndPoints } from "../../../utils";

export async function saveSupplierService(supplier: Supplier) {
    const res = await API.post<Supplier>({ url: EndPoints.SUPPLIER, data: supplier });
    return res;
}