import { BillDetail, Client, User } from ".";
import { PaymentMethods } from "./paymentMethods.model";

export enum BillState {
    SENT = "Enviada",
    PROGRESS = "En proceso",
    ACCEPTED = "Aceptada",
    REJECTED = "Rechazada",
    CANCELED = "Anulada",
}

export interface Bill {
    id?: string,
    invoiceNumber: string;
    keyAccess: string;
    status: string;
    issueDate: string;
    description: string;
    iva: number;
    subtotalExcludingIVA: number;
    total: number;
    discount: number;
    user: User;
    client: Client;
    payment?: PaymentMethods;
    details: BillDetail[];
}