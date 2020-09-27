import {CreateUserCommand, User} from "model/User"
import userRepository from "./entity/userRepository"
import { v4 as uuidv4 } from 'uuid';
import jwt from "jsonwebtoken"
import {userDocumentToUser} from "./entity/userEntity";

export const createUser = async (command: CreateUserCommand): Promise<User> => {
    const loginToken = uuidv4()
    const userCreated = await userRepository.create({...command, loginToken: loginToken})
    return userDocumentToUser(userCreated)
}

export const login = async (email: string, loginToken: string): Promise<string> => {
    const userDocument = await userRepository.find({ email: email })
    if (userDocument.length <= 0) throw "this email isn't registered"
    if (userDocument[0].loginToken !== loginToken || userDocument[0].loginToken.length < 20) throw "the loginToken isn't valid"
    userRepository.update(userDocument[0], {loginToken: ""}).then((res) => {console.log("nb modifié: " + res)})
    const user: User = userDocumentToUser(userDocument[0])
    if (process.env.AccessTokenSecret === undefined) throw "the server didn't find the access token"
    return jwt.sign(user, process.env.AccessTokenSecret)
}