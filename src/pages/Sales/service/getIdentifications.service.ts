import API from "../../../lib/API";
import { ResponseRequest } from "../../../models";
import { EndPoints } from "../../../utils";

const URL = `${EndPoints.CLIENT}/identification`;
export async function getIdentificationsService() {
    const res = await API.get<ResponseRequest<string[]>>({ url: URL });
    return res;
}