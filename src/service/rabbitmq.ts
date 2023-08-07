import client, {Channel, Connection} from 'amqplib'
import { Variables } from '../config/variables'
// 'amqp://username:password@localhost:5672'

export const rabbitMQ = async () => await client.connect({ 
    username: Variables.RABBITMQ_USERNAME,
    password: Variables.RABBITMQ_PASSWORD,
    hostname: Variables.RABBITMQ_HOST,
    port: Variables.RABBITMQ_PORT
    })
