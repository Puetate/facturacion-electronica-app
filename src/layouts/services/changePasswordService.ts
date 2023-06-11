import API from "../../lib/API";
import { User } from "../../models";
import { ChangePasswordAdmin } from "../components/FormChangePassword";

const URL = "auth/change-password/admin";
export default async function changePasswordAdminService(changePasswordAdmin: ChangePasswordAdmin, admin: User) {
    console.log(changePasswordAdmin);

    const url = `${URL}/${admin._id}`;
    const res = await API.patch({ url: url, data: changePasswordAdmin });
    return res
}
