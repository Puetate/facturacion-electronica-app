import { User } from "../models";
import { UserData } from "../pages/Users/components/UsersTable";

export const getUserProperties = (userModel: User) => {

    const user: UserData = {
        id: userModel.id,
        company: ((userModel.company != null) ? userModel.company.id : "")!,
        identification: userModel.identification,
        email: userModel.email,
        fullName: userModel.fullName,
        status: (userModel.status) ? "true" : "false",
        role: userModel.role,
        telephone: userModel.telephone
    }
    return user;
}