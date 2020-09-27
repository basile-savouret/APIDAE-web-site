import { Box, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import React from 'react'
import { Pin } from '../../../components/icons';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column"
    },
    paper: {
        padding: "15px 10px",
        maxWidth: "calc(100% - 20px)",
        minWidth:"400px"
    },
    pin: {
        width: "25px",
        height: "25px"
    },
    headerContainer:{
        padding: "0px 10px",
        alignItems: "center"
    }
}));

interface MessageProps {
    children?: React.ReactNode
    writerFirstname?: string
    writerLastname?: string
    timestamp?: string
    pinned?: boolean
}

export const Message = (props: MessageProps) => {
    const { children, timestamp, writerFirstname, writerLastname, pinned = false } = props
    const classes = useStyles()
    return (
        <Box maxWidth="100%" display="flex" flexDirection="column" marginTop="20px">
            <Box width="100%" display="flex" justifyContent="space-between" height="30px" className={classes.headerContainer}>
                <Typography variant="body2">
                    {writerFirstname}
                </Typography>
                <Typography variant="body2">
                    {timestamp && new Date(Number(timestamp)).toDateString()}
                </Typography>
            </Box>
            <Box maxWidth="100%" display="flex">
                <Paper className={classes.paper}>
                    {children}
                </Paper>
                <Pin color={pinned ? "#A5E9E1" : "#827D74"} className={classes.pin} />
            </Box>
        </Box>
    )
}
