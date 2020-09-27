import express, {Request, Response} from "express"
import userRoutes from "./User/endpoint/userEnpoint"
import mongoose from "mongoose"
import dotenv from "dotenv"
import messageRoutes from "./Message/endpoint/messageEnpoint";
import messageStreamListener from "./Message/entity/messageStreamListener";

//app config
dotenv.config()
const app = express()
const port = process.env.PORT || 8080
app.use(express.json())
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000/")
//     res.setHeader("Access-Control-Allow-Headers", "*")
//     next()
// })

//mongo config
const connectionUrl = `mongodb+srv://${process.env.mongoUserName}:${process.env.mongoUserPassword}@cluster0.pknhr.gcp.mongodb.net/${process.env.mongoDB}?retryWrites=true&w=majority`
mongoose.connect(connectionUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})


mongoose.connection.once("open", () => {
    messageStreamListener()
})

app.get('/api', (req: Request, res: Response) => res.status(200).send('this part of the application is for the api'))

app.use('/api/users', userRoutes);

app.use('/api/messages', messageRoutes);

app.listen(port)