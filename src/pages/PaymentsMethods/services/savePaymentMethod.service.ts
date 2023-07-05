import API from "../../../lib/API";
import { PaymentMethods, ResponseRequest } from "../../../models";
import { EndPoints } from "../../../utils";

export async function savePaymentMethodService(payment: PaymentMethods) {
    const res = await API.post<ResponseRequest<PaymentMethods>>({ url: EndPoints.PAYMENT, data: payment });
    return res;
}