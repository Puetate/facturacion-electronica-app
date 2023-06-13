import { User } from ".";
import { CustomerCompany } from "./customerCompany.model";
import { CustomerPerson } from "./customerPerson.model";
import { PaymentMethods } from "./paymentMethods.model";

export enum BillState {
	SENT = "Enviada",
    PROGRESS = "En proceso",
    ACCEPTED = "Aceptada",
	REJECTED = "Rechazada",
	CANCELED = "Anulada",
}

export interface Bill {
	id_bill?: string,
	user: User,
    customer: CustomerPerson | CustomerCompany,
    paymentMethods: PaymentMethods,
    invoiceNumber:string,
    state: BillState,
    broadcastDate: Date,
    description: string,
    IVA: number,
    subtotal: number
    total: number
}