import API from "../../../lib/API"; 
import { Email } from "../components/FormRecoveryPassword";

const URL = "/public/auth/recovery/password";

export async function recoveryPasswordService(email: string) {
    const url= `${URL}/${email}`;
    const res = await API.patch<Email>({url});
    return res
}