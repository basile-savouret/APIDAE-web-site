import userRepository from "./entity/userRepository"
import {User} from "model/User"
import {userDocumentToUser} from "./entity/userEntity";


export const getUserById = async (id: string): Promise<User> => {
    const userDocument = await userRepository.findById(id)
    if (userDocument === null) throw "this user doesn't exist"
    const user: User = userDocumentToUser(userDocument)
    return user
}

export const getUserByEmail = async (email: string): Promise<User> => {
    const userDocument = await userRepository.find({ email: email })
    if (userDocument.length <= 0) throw "this email isn't registered"
    const user: User = userDocumentToUser(userDocument[0])
    return user
}