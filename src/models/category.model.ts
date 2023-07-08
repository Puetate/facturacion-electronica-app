import { Promotion } from "./promotion.model";
import { Tax } from "./tax.model";

export interface Category {
    id?: string,
    tax: Tax,
    promotion: Promotion
    category:string
    status: boolean
}