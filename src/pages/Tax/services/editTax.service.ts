import API from "../../../lib/API";
import { EndPoints } from "../../../utils";
import { TaxData } from "../components/TaxTable";

export default async function editTaxService(id: string, tax: TaxData) {
    const url = `${EndPoints.TAX}/${id}`;
    const res = await API.patch<TaxData>({ url, data: tax })
    return res
} 