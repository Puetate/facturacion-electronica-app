import { CreditNote } from "./creditNote.model";
import { Product } from "./product.model";

export interface CreditNoteDetail {
	creditNote: CreditNote,
    product: Product,
    price: number,
    quality: number,
    discount: number,
    subtotal: number
}