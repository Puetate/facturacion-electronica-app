import API from "../../../lib/API";
import { Supplier } from "../../../models";
import { EndPoints } from "../../../utils";


export async function deleteSupplierService(id: string) {
    const url = `${EndPoints.SUPPLIER}/${id}`;
    const res = await API.del<Supplier>({ url });
    return res;
}