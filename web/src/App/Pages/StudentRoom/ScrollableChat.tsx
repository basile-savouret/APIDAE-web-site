import React, { useCallback, useEffect, useRef, useState } from 'react'
import { messageClient } from '../../../api/message'
import { Message } from "model/Message"
import { Message as MessageComponent } from './Message'
import { Box, CircularProgress, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles(() => ({
    root: {
        height: "calc(100vh - 170px)",
        width: "calc(100% + 24px)",
        overflow: "auto",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column"
    }
}));

interface ScrollableChatProps {
    messages: Message[]
    onMessagesChange: (newMessages: Message[]) => void
    total: number
    setTotal: (newTotal: number) => void
    pageNumber: number
    setPageNumber: (newTotal: number) => void
}

export const ScrollableChat = (props: ScrollableChatProps) => {
    const {messages, onMessagesChange, pageNumber, setPageNumber, setTotal, total} = props
    const classes = useStyles()
    const [loading, setLoading] = useState<boolean>(false);
    const [scrollDone, setScrollDone] = useState<boolean>(false)

    const onChangeRef = useCallback(
        (rootEl: HTMLDivElement | null) => {
            if (rootEl && !scrollDone && !loading && messages.length > 0) {
                rootEl.scrollTo(0, rootEl.scrollHeight)
                setScrollDone(true)
            }
        },
        [messages, loading, scrollDone],
    )

    const observer = useRef<IntersectionObserver>();
    useEffect(() => {
        if (!loading) {
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && total > pageNumber * 10 && !loading) {
                    setPageNumber(pageNumber + 1);
                }
            });
            const element = document.getElementById("firstElement-studentRoom");
            element && observer.current.observe(element);
        }
        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, [loading, total, pageNumber]);

    useEffect(() => {
        setLoading(true);
        messageClient.getStudentRoomMessages(10, pageNumber - 1).then((paginedList) => {
            if (paginedList.total !== total) {
                setTotal(paginedList.total);
            }
            onMessagesChange(paginedList.list)
            setLoading(false);
        })
    }, [pageNumber]);

    return (
        <div ref={onChangeRef} className={classes.root} id="studentChatRoom">
            {loading ? (
                <Box display='flex' justifyContent='center'>
                    <CircularProgress
                        disableShrink
                        color='secondary'
                        size={50}
                    />
                </Box>
            ) : (
                    <Box display='flex' justifyContent='center'>
                        <Typography
                            id="firstElement-studentRoom"
                            variant='body2'
                            style={{
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                marginTop: '50px',
                                marginLeft: '15px',
                                marginRight: '15px'
                            }}
                        >
                            {total > pageNumber * 10
                                ? 'Voir plus'
                                : 'Pas de messages supplémentaire'}
                        </Typography>
                    </Box>
                )}
            {messages.length > 0 && messages.map((message) => (
                <MessageComponent
                    key={message.id}
                    writerFirstname={message.writerFirstname}
                    writerLastname={message.writerLastname}
                    pinned={message.pinned}
                    timestamp={message.timestamp}
                >
                    <Typography variant="body1">
                        {message.message}
                    </Typography>
                </MessageComponent>
            ))}
        </div>
    )
}
