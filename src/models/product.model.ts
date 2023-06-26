import { Category } from "./productCategory.model";
import { Promotion } from "./promotion.model";

export interface Product {
    id_product?: string,
    categoryProduct: Category,
    promotion: Promotion,
    codeProduct: string,
    name: string,
    price: number,
    quality: number,
    state: boolean,
    elaborationDate: Date,
    expirationDate: Date,
    minimumStock: number,
    maximumStock:number
}