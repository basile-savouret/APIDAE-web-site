import {MessageDocument} from "./messageRepository";
import {Message} from "model/Message";


export const messageDocumentToMessage = (messageDocument: MessageDocument): Message => {
    return {
        id: messageDocument.id,
        writerFirstname: messageDocument.writerFirstname,
        writerLastname: messageDocument.writerLastname,
        message: messageDocument.message,
        pinned: messageDocument.pinned,
        timestamp: messageDocument.timestamp,
        room:  messageDocument.room
    }
}