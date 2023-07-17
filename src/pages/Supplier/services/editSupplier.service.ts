import API from "../../../lib/API";
import { Supplier } from "../../../models";
import { EndPoints } from "../../../utils";

export async function editSupplierService(id: string, supplier: Supplier) {
    const url = `${EndPoints.SUPPLIER}/${id}`;
    const res = await API.patch<Supplier>({ url, data: supplier })
    return res
} 