import { Product } from "./product.model"
import { Purchase } from "./purchase.model"

export interface PurchaseDetail {
    purchase: Purchase,
    product: Product,
    quality: number,
    code: string,
    discount: number,
    subtotal: number
}