import  express, { json } from "express";
import { Variables } from "./config/variables";
import { Request, Response } from "express";
import { MessageBroker } from "./service/rabbitmq";

const app = express()
app.use(json())
app.get('/', (_req: Request, res: Response)=> res.send('Hai there, i was Producer'))
app.post('/message', (req: Request, res: Response) => {
    const { message, queueName } = req.body
    const messager = new MessageBroker()
    messager.sendMessage(message, queueName)
    return res.send({ message, queueName })
})
app.listen(Variables.APP_PORT, () => console.log(`App running on port: ${Variables.APP_PORT}`))