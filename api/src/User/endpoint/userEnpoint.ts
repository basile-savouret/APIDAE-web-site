import express, {NextFunction, Request, Response} from "express"
import {createUser, login} from "../userAgreggateService"
import {getUserById} from "../userFinderService"
import jwt from "jsonwebtoken"

const userRoutes = express.Router()

const userAuthentification = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.sendStatus(401)
    if (process.env.AccessTokenSecret === undefined) return res.status(500).send('the server didn\'t find the access token')
    jwt.verify(token, process.env.AccessTokenSecret, (err, user) => {
        if (err) return res.sendStatus(403)
        req.body.user = user
        next()
    })
}

userRoutes.get("/login", (req: Request, res: Response) => {
    console.log(`login of the user with the email: ${req.query.email}`)
    login(req.query.email as string, req.query.loginToken as string).then((accessToken) => {
        res.json({accessToken: accessToken})
    }).catch((err) => {
        res.status(500).send(err)
    })
})

userRoutes.post("", userAuthentification, (req: Request, res: Response) => {
    console.log(`creating a user`)
    createUser(req.body).then((userCreated) => {
        res.status(201).send(userCreated)
    }).catch((err) => {
        res.status(500).send(err)
    })
})

userRoutes.get("/:userId", userAuthentification, (req: Request, res: Response) => {
    console.log(`getting the user with the id: ${req.params.userId}`)
    getUserById(req.params.userId).then((user) => {
        res.status(201).send(user)
    }).catch((err) => {
        res.status(500).send(err)
    })
})

export default userRoutes