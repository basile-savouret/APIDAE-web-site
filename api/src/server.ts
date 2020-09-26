import express, {Request, Response} from "express"
import userRoutes from "./User/endpoint/userEnpoint"
import mongoose from "mongoose"
import dotenv from "dotenv"

//app config
const app = express()
const port = process.env.PORT || 8080
app.use(express.json())
dotenv.config()

//mongo config
const connectionUrl = `mongodb+srv://${process.env.mongoUserName}:${process.env.mongoUserPassword}@cluster0.pknhr.gcp.mongodb.net/${process.env.mongoDB}?retryWrites=true&w=majority`
mongoose.connect(connectionUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.get('/api', (req: Request, res: Response) => res.status(200).send('this part of the application is for the api'))

app.use('/api/user', userRoutes);

app.listen(port)