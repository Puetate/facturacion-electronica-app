import { Product } from "./product.model";

export interface BillDetail {
    id: string;
    discount: number;
    quantity: number;
    price: number;
    subtotal: number;
    product: Product;
}