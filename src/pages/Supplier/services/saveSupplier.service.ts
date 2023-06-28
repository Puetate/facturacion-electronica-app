import API from "../../../lib/API";
import { Supplier } from "../../../models";
import { EndPoints } from "../../../utils";

export default async function saveSupplierService(supplier: Supplier) { 
    const res = await API.post<Supplier>({ url: EndPoints.SUPPLIER, data: supplier }); 
    return res; 
}