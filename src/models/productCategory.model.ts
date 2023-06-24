import { Promotion } from "./promotion.model";
import { Tax } from "./tax.model";

export enum Category {
    MEATS = "Carnes",
    FRUITS = "Frutas",
    VEGETABLES = "Verduras",
    BEVERAGES = "Bebidas",
    GRAINS = "Granos",
    CEREALS = "Cereales",
    CONDIMENTS = "Condimentos",
    OTRO = "Otro",
    EMPTY = ""
}

export const enumCategory = Object.values(Category);

export interface ProductCategory {
    id?: string,
    tax: Tax,
    promotion: Promotion
    category:string
    status: boolean
}