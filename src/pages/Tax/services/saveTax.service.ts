import API from "../../../lib/API";
import { EndPoints } from "../../../utils";
import { TaxData } from "../components/TaxTable";

export default async function saveTaxService(tax: TaxData) {
    const res = await API.post<TaxData>({ url: EndPoints.TAX, data: tax });
    return res;
}