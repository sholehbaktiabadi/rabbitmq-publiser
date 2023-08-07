import  express from "express";
import { Variables } from "./config/variables";
import { rabbitMQ } from "./service/rabbitmq";
import { Request, Response } from "express";

const app = express.application
const rabbitConnection = async () => (await (await rabbitMQ()).createConfirmChannel()).assertQueue('kirim pesan 3', { arguments: { "action": "kirim pesan 3" } })
rabbitConnection()
app.get('/', (_req: Request, res: Response) => res.send({messsage: 'hai there !'}))
app.listen(Variables.APP_PORT, () => console.log(`App running on port: ${Variables.APP_PORT}`))