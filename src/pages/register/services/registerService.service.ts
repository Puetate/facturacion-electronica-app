import API from "../../../lib/API";
import { Company, ResponseRequest } from "../../../models";

const URL = "/public/auth/logup";

export async function registerService(company: Company) {
    const res = await API.post<ResponseRequest<null>>({ url: URL, data: company });
    return res;
}