import {CreateMessageCommand, MessageRoom} from "model/Message"
import mongoose, {Schema, Document} from "mongoose";

export interface MessageDocument extends CreateMessageCommand, Document {
    pinned: boolean
    room: MessageRoom
    writerFirstname: string
    writerLastname: string
}

const MessageSchema: Schema = new Schema({
    writerFirstname: {type: Schema.Types.String, required: true},
    writerLastname: {type: Schema.Types.String, required: true},
    message: {type: Schema.Types.String, required: true},
    timestamp: {type: Schema.Types.String, required: true},
    pinned: {type: Schema.Types.Boolean, required: true},
    room: {type: Schema.Types.String, required: true},
});

export default mongoose.model<MessageDocument>('messages', MessageSchema);