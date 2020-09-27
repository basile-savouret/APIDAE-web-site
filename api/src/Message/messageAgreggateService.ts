import {Message,  CreateMessageCommand, MessageRoom} from "model/Message"
import userRepository from "./entity/messageRepository"
import {messageDocumentToMessage} from "./entity/messageEntity";

export const createMessage = async (command: CreateMessageCommand, room: MessageRoom): Promise<Message> => {
    const messageCreated = await userRepository.create({...command, pinned: false, room: room})
    return messageDocumentToMessage(messageCreated)
}