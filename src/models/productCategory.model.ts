import { Promotion } from "./promotion.model";
import { Tax } from "./tax.model";

export enum Category {
	MEATS = "Carnes",
    FRUITS = "Frutas",
    VEGETABLES = "Verduras",
    BEVERAGES = "Bebidas",
    GRAINS = "Granos",
    CEREALS = "Cereales",
    CONDIMENTS = "Condimentos"
}

export interface ProductCategory {
	id_productCategory?: string,
    tax: Tax,
    promotion: Promotion
    category: Category 
    state: boolean
}