import React, { useEffect, useState } from 'react'
import { messageClient } from '../../../api/message'
import {Message} from "model/Message"
import { Message as MessageComponent} from './Message'
import { makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles(() => ({
    root: {
        height: "calc(100vh - 170px)",
        width: "calc(100% + 10px)",
        overflow: "auto",
        overflowX: "hidden"
    }
}));

export const ScrollableChat = () => {
    const [messages, setMessages] = useState<Message[]>([])
    const [total, setTotal] = useState<number>(0)
    const classes = useStyles()

    useEffect(() => {
        messageClient.getStudentRoomMessages(10, 0).then((paginedList) => {
            setMessages(paginedList.list)
            setTotal(paginedList.total)
        })
    }, [])

    return (
        <div className={classes.root}>
            {messages.map((message) => (
                <MessageComponent 
                key={message.id} 
                writerFirstname={message.writerFirstname}
                writerLastname={message.writerLastname}
                pinned={message.pinned}
                timestamp={message.timestamp}
                >
                    <Typography variant="body2">
                        {message.message}
                    </Typography>
                </MessageComponent>
            ))}
        </div>
    )
}
