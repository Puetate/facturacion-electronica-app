import API from "../../../lib/API";
import { Credentials } from "../components/FormLogin";

const URL = "/auth/login-admin";
export default async function loginService(credentials: Credentials) {
	const res = await API.post({ url: URL, data: credentials });
    return res
}
