import { Bill } from "./bill.model";

export interface CreditNote {
	id_creditNote?: string,
    bill: Bill,
    numberCreditNote: string,
    broadcastDate: Date
}