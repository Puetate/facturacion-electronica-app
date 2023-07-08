import API from "../../../lib/API";
import { PaymentMethods, ResponseRequest } from "../../../models";
import { EndPoints } from "../../../utils";

export async function editPaymentMethodService(id: string, payment: PaymentMethods) {
    const url = `${EndPoints.PAYMENT}/${id}`;
    const res = await API.patch<ResponseRequest<PaymentMethods>>({ url, data: payment })
    return res
} 