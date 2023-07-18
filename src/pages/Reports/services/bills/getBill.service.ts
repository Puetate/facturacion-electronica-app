import API from "../../../../lib/API";
import { Bill, ResponseRequest } from "../../../../models";
import { EndPoints } from "../../../../utils";

export async function getBillService(id: string) {
    const url = `${EndPoints.BILLS}/${id}`;
    const res = await API.get<ResponseRequest<Bill>>({ url });
    return res;
}