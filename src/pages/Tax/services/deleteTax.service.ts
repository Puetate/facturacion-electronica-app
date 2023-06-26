import API from "../../../lib/API";
import { Tax } from "../../../models";
import { EndPoints } from "../../../utils";


export default async function deleteTaxService(id: string) {
    const url = `${EndPoints.TAX}/${id}`;
    const res = await API.del<Tax>({ url });
    return res;
}