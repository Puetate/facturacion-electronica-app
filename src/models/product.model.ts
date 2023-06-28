import { Category } from "./productCategory.model";
import { Promotion } from "./promotion.model";

export interface Product {
    id: string,
    category: Category,
    promotion: Promotion,
    code: string,
    name: string,
    price: number,
    quantity: number,
    status: boolean,
    minStock: number,
    maxStock:number
}