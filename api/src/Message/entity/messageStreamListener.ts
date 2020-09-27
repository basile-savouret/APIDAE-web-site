import mongoose from "mongoose"
import {Message} from "model/Message";
import Pusher from "pusher"
import {messageDocumentToMessage} from "./messageEntity"

const messageStreamListener = () => {
    const msgCollection = mongoose.connection.collection("messages")
    const changeStream = msgCollection.watch();

    const pusher = new Pusher({
        appId: '1080538',
        key: '80f4d96a13da856420d0',
        secret: '8967018c2bbe5e11bd30',
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