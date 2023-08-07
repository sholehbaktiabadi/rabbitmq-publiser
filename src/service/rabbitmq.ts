import client from 'amqplib'
import { Variables } from '../config/variables'


export class MessageBroker{
    private async rabbitMqConnection(){
        return await client.connect({ 
            username: Variables.RABBITMQ_USERNAME,
            password: Variables.RABBITMQ_PASSWORD,
            hostname: Variables.RABBITMQ_HOST,
            port: Variables.RABBITMQ_PORT
            })
    }
    
    async sendMessage(message: string, queueName: string){
        try {
            const connection = await this.rabbitMqConnection()
            const channel = await connection.createChannel()
            await channel.assertQueue(queueName, { durable: false })
            channel.sendToQueue(queueName, Buffer.from(message))
            console.log(`Sent: ${message}`)
    
            setTimeout(() => {
                connection.close();
                process.exit(0);
            }, 500);
        } catch (error) {
            console.error(error)
        }
    }
}