import API from "../../../lib/API";
import { Supplier } from "../../../models";
import { EndPoints } from "../../../utils";
import { ResponseRequest } from "../../Categories/services/getCategories.service";


export interface SupplierResponse extends ResponseRequest {
    data: Supplier[]
}

export default async function getSupplierService() {
    const res = await API.get<SupplierResponse>({ url: EndPoints.SUPPLIER });
    return res;
}