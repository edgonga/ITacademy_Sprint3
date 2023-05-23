import * as amqp from 'amqplib'

export class Subscriber {

    private connection!: amqp.Connection
    private channel!: amqp.Channel
    private queueName: string
    private teacherName: string

    constructor(queueName: string, teacherName: string) {
        this.queueName = queueName
        this.teacherName = teacherName
    }

    public async connectToMoodle(): Promise<void> {
        this.connection = await amqp.connect('amqp://localhost')
        this.channel = await this.connection.createChannel()
        await this.channel.assertQueue(this.queueName, { durable: false })
    }

    public async reviewingNews(): Promise<void> {
        console.log("Checking if there is new homeworks to correct...")

        this.channel.consume(this.queueName, (message) => {
            if(message !== null) {
                console.log(`New task received: ${message.content.toString()}`)
                this.channel.ack(message)
                
            }
        })
    }

    public async disconnect(): Promise<void> {
        await Promise.all([
            this.channel.close(),
            this.connection.close()
        ])
        
    }
}