import API from "../../../lib/API";
import { ResponseRequest, Supplier } from "../../../models";
import { EndPoints } from "../../../utils";



export async function getSuppliersService() {
    const res = await API.get<ResponseRequest<Supplier[]>>({ url: EndPoints.SUPPLIER });
    return res;
}