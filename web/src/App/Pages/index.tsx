import { makeStyles, Theme } from '@material-ui/core';
import React from 'react'
import StudentRoom from "./StudentRoom"

const useStyles = makeStyles((theme: Theme) => ({
  }));

const Pages = () => {
    const classes = useStyles()
    return (
        <>
            <StudentRoom />
        </>
    )
}

export default Pages;