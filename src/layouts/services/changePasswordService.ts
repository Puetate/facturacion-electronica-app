import API from "../../lib/API";
import { User } from "../../models";
import { ChangePasswordAdmin } from "../components/FormChangePassword";

const URL = "auth/change-password/admin";
export default async function changePasswordAdminService(changePasswordAdmin: ChangePasswordAdmin, admin: User) {

    const url = `${URL}/${admin.id}`;
    const res = await API.patch({ url: url, data: changePasswordAdmin });
    return res
}
