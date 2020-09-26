import {UserDocument} from "./userRepository";
import {User} from "model/User";

export const userDocumentToUser = (userDocument: UserDocument): User => {
    return {
        id: userDocument.id,
        email: userDocument.email,
        firstname: userDocument.firstname,
        lastname: userDocument.lastname,
        roles: userDocument.roles
    }
}