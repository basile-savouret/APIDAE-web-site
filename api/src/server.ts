import express, {Request, Response} from "express"
import userRoutes from "./User/endpoint/userEnpoint"
import mongoose from "mongoose"
import dotenv from "dotenv"
import messageRoutes from "./Message/endpoint/messageEnpoint";
import messageStreamListener from "./Message/entity/messageStreamListener";
import cookieParser from "cookie-parser"
import cors from 'cors'

//app config
dotenv.config()
const app = express()
const port = process.env.PORT || 8080
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

//mongo config
const connectionUrl = `mongodb+srv://${process.env.mongoUserName}:${process.env.mongoUserPassword}@cluster0.pknhr.gcp.mongodb.net/${process.env.mongoDB}?retryWrites=true&w=majority`
mongoose.connect(connectionUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("error", (err) => {
    console.log(err)
})

mongoose.connection.once("open", () => {
    messageStreamListener()
})

app.get('/api', (req: Request, res: Response) =>{
    console.log()
    res.status(200).send('this part of the application is for the api')
})

app.use('/api/users', userRoutes);

app.use('/api/messages', messageRoutes);

app.listen(port)