import API from "../../../lib/API";
import { EndPoints } from "../../../utils";
import { Billing } from "../components/Controls";
const URL = `${EndPoints.BILLS}`;
export async function saveBillService(bill: Billing) {
    const res = await API.post({ url: URL, data: bill })
    return res;
}