import mongoose from "mongoose"
import {Message} from "model/Message";
import Pusher from "pusher"
import {messageDocumentToMessage} from "./messageEntity"

const messageStreamListener = () => {
    const msgCollection = mongoose.connection.collection("messages")
    const changeStream = msgCollection.watch();
    const pusher = new Pusher({
        appId: '1080538',
        key: process.env.pusherKey as string,
        secret: process.env.pusherSecret as string,
        cluster: 'eu',
        useTLS: true
    });


    changeStream.on("change", (change) => {
        if (change.operationType === "insert") {
            const message = messageDocumentToMessage(change.fullDocument)
            pusher.trigger(message.room, "inserted", {
                id: message.id,
                firstname: message.writerFirstname,
                lastname: message.writerLastname,
                message: message.message,
                pinned: message.pinned,
                timestamp: message.timestamp
            })
        }
    })
}

export default messageStreamListener