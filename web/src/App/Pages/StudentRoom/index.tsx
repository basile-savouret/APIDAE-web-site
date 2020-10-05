import React, { useCallback, useEffect, useState } from 'react'
import { Box, Button, makeStyles, Paper, Theme } from '@material-ui/core';
import { ScrollableChat } from './ScrollableChat';
import { messageClient } from '../../../api/message';
import { Message } from 'model/Message';
import Pusher from "pusher-js"

const useStyles = makeStyles((theme: Theme) => ({
    sendBox: {
        position: "absolute",
        bottom: "24px",
        width: "calc(100% - 48px)"
    },
    sendButton: {
        borderRadius: "3px",
        maxWidth: "120px",
        height: "45px",
        width: "20%",
        minWidth: "80px",
        color: "white",
        background: theme.palette.secondary.main,
        "& span": {
            textTransform: "none"
        },
        "&:hover": {
            background: "rgba(56, 129, 134, 0.8)"
        }
    },
    inputContainer: {
        width: "75%",
        position: "relative",
        height: "calc(45px - 20px)",
        background: "white",
        padding: "10px"
    },
    input: {
        width: "calc(100% - 14px)",
        padding: "5px 7px",
        borderBottom: "1px rgba(130, 125, 116, 0.5) solid",
        outline: "none !important",
        color: "#827D74",
        border: "none",
        "&::placeholder": {
            fontFamily: "Roboto",
            fontSize: "13px",
            fontStyle: "italic",
            color: "#827D74"
        }
    }
}));

const StudentRoom = () => {
    const classes = useStyles()
    const [message, setMessage] = useState<string>("")
    const [messages, setMessages] = useState<Message[]>([])
    const [total, setTotal] = useState<number>(0)
    const [pageNumber, setPageNumber] = useState<number>(1);

    const upHandler = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            messageClient.createStudentRoomMessage(message, String(Date.now()))
            setMessage("")
        }
    };

    useEffect(() => {
        window.addEventListener("keyup", upHandler);

        return () => {
            window.removeEventListener("keyup", upHandler);
        };
    }, [message]);

    const onSendClick = useCallback(
        () => {
            messageClient.createStudentRoomMessage(message, String(Date.now()))
            setMessage("")
        },
        [message],
    )

    

    useEffect(() => {
        const pusher = new Pusher('9887b19d4f2a8493ad40', {
            cluster: 'eu'
        });

        const channel = pusher.subscribe('studentRoom');
        channel.bind('inserted', (data: any) => {
            const messageReceived = JSON.parse(JSON.stringify(data)) as Message
            setMessages((prevMessages) => {
                const newTab = [...prevMessages]
                newTab.push(messageReceived);
                console.log(newTab)
                return newTab
            });
            setTotal(prevTotal => prevTotal + 1)
            const rootEl = document.getElementById("studentChatRoom")
            if (rootEl && rootEl.scrollTop >= rootEl.scrollHeight - rootEl.offsetHeight - 150) rootEl.scrollTo(0, rootEl.scrollHeight)
        });
    }, [])

    const onMessageChange = useCallback(
        (newMessages: Message[]) => {
            setMessages((prevMessages) => {
                if (prevMessages && pageNumber !== 1) {
                    const newTab = [...prevMessages].reverse().concat(newMessages).reverse();
                    return newTab
                } else return newMessages;
            });
        },
        [pageNumber],
    )
    return (
        <>
            <ScrollableChat pageNumber={pageNumber} total={total} setPageNumber={setPageNumber} setTotal={setTotal} onMessagesChange={onMessageChange} messages={messages} />
            <Box display="flex" justifyContent="space-between" className={classes.sendBox}>
                <Button
                    className={classes.sendButton}
                    onClick={onSendClick}
                >
                    Envoyer
                </Button>
                <Paper className={classes.inputContainer}>
                    <input className={classes.input} type="text" placeholder="Ecrivez votre message" value={message} onChange={(event) => setMessage(event.target.value)} />
                </Paper>
            </Box>
        </>
    )
}

export default StudentRoom