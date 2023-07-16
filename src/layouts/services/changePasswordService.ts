import API from "../../lib/API";
import { EndPoints } from "../../utils";
import {ChangePasswordAdmin} from "../../layouts/components/FormChangePassword";

export async function changePasswordAdminService(id: string, newPassword: string) {
    const url = `${EndPoints.USERS}/${id}/${newPassword}`;
    const res = await API.patch<ChangePasswordAdmin>({url});
    return res
}

