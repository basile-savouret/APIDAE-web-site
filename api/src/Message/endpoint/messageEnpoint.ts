import express, {NextFunction, Request, Response} from "express"
import {createMessage} from "../messageAgreggateService"
import {getMessagesPaginedList} from "../messageFinderService"
import jwt from "jsonwebtoken"

const messageRoutes = express.Router()

const studentAuthentification = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.JWT as string
    if (!token) return res.sendStatus(401)
    if (process.env.AccessTokenSecret === undefined) return res.status(500).send('the server didn\'t find the access token')

    jwt.verify(token, process.env.AccessTokenSecret, (err, user) => {
        //@ts-ignore
        if (!user || !user.roles.includes("student")) return res.sendStatus(401)
        if (err) return res.sendStatus(403)
        req.body.user = user
        next()
    })
}

const teacherAuthentification = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.JWT as string
    if (!token) return res.sendStatus(401)
    if (process.env.AccessTokenSecret === undefined) return res.status(500).send('the server didn\'t find the access token')

    jwt.verify(token, process.env.AccessTokenSecret, (err, user) => {
        if (err) return res.sendStatus(403)
        req.body.user = user
        next()
    })
}

messageRoutes.get("/studentRoom", studentAuthentification, (req: Request, res: Response) => {
    console.log(`getting the list of messages of the student room`)
    getMessagesPaginedList("studentRoom", Number(req.query.perPage), Number(req.query.page)).then((messages) => {
        res.send(messages)
    }).catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
})

messageRoutes.post("/studentRoom", studentAuthentification, (req: Request, res: Response) => {
    console.log(`creating a student room message`)
    createMessage(req.body, req.body.user.firstname, req.body.user.lastname, "studentRoom").then((messageCreated) => {
        res.status(201).send(messageCreated)
    }).catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
})

messageRoutes.get("/teacherRoom", teacherAuthentification, (req: Request, res: Response) => {
    console.log(`getting the list of messages of the teacher room`)
    getMessagesPaginedList("teacherRoom", Number(req.query.perPage), Number(req.query.page)).then((messages) => {
        res.send(messages)
    }).catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
})

messageRoutes.post("/teacherRoom", teacherAuthentification, (req: Request, res: Response) => {
    console.log(`creating a teacher room message`)
    createMessage(req.body, req.body.user.firstname, req.body.user.lastname,"teacherRoom").then((messageCreated) => {
        res.status(201).send(messageCreated)
    }).catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
})

export default messageRoutes