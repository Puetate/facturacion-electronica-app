import API from "../../../lib/API";
import { PaymentMethods, ResponseRequest } from "../../../models";
import { EndPoints } from "../../../utils";

export async function getPaymentMethodsService() {
    const res = await API.get<ResponseRequest<PaymentMethods[]>>({ url: EndPoints.PAYMENT });
    return res;
}