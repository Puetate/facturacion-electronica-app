import { Tax } from ".";
import { Category } from "./category.model";
import { Promotion } from "./promotion.model";

export interface Product {
    id: string,
    code: string,
    name: string,
    price: number,
    quantity: number,
    status: boolean,
    minStock: number,
    maxStock: number
    category: Category,
    promotion: Promotion,
    tax:Tax
}