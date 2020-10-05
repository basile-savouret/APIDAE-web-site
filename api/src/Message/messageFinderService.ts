import userRepository from "./entity/messageRepository"
import {Message, MessageRoom} from "model/Message"
import {PaginedList} from "model/PaginedList"
import {messageDocumentToMessage} from "./entity/messageEntity";
import messageRepository from "./entity/messageRepository";


export const getMessagesPaginedList = async (room: MessageRoom, perPage: number, page: number): Promise<PaginedList<Message>> => {
    const messageDocumentPage = await userRepository.find({room: room}).limit(perPage).skip(perPage * page).sort({ timestamp: -1})
    const messageDocumentPageReversed = messageDocumentPage.reverse()
    const count = await messageRepository.estimatedDocumentCount()
    if (messageDocumentPageReversed.length <= 0) throw "no message found"
    return {
        total: count,
        list: messageDocumentPageReversed.map((messageDocument) => messageDocumentToMessage(messageDocument))
    }
}
