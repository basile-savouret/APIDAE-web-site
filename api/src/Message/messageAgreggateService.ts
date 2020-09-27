import {Message,  CreateMessageCommand, MessageRoom} from "model/Message"
import userRepository from "./entity/messageRepository"
import {messageDocumentToMessage} from "./entity/messageEntity";

export const createMessage = async (command: CreateMessageCommand, writerFirstname: string, writerLastname: string, room: MessageRoom): Promise<Message> => {
    const messageCreated = await userRepository.create({...command, pinned: false, writerFirstname: writerFirstname, writerLastname: writerLastname, room: room})
    return messageDocumentToMessage(messageCreated)
}