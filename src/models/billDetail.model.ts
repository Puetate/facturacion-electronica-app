import { Bill } from "./bill.model";
import { Product } from "./product.model";

export interface BillDetail {
	bill?: Bill,
    product: Product,
    discount: number,
    quality: number,
    price: number,
    subtotal: number
}