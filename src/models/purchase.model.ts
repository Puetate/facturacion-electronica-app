import { User } from ".";
import { PaymentMethods } from "./paymentMethods.model";
import { Supplier } from "./supplier.model";

export interface Purchase {
	id_purchase?: string,
    supplier: Supplier,
    paymentMethods: PaymentMethods,
    user: User,
    numberPurchase: string,
    datePurchase: Date,
    subtotal: number,
    IVA: number,
    total:number
}