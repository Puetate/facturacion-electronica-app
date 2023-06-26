import { Tax } from "../models";
import { TaxData } from "../pages/Tax/components/TaxTable";

export const getTaxProperties = (taxs: Tax) => {

    const tax: TaxData = {
        id: taxs.id || "",
        tax: taxs.tax,
        percentage:taxs.percentage,
        status: (taxs.status) ? "true" : "false"

    }
    return tax;
}

export const getTaxRequest = (taxs: TaxData) => {

    const tax = {
        id: taxs.id || "",
        tax: taxs.tax,
        percentage: taxs.percentage,
        status: taxs.status

    }
    return tax;
}