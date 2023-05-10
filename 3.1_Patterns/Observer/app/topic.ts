const { EventEmitter } = require('events')
import { User } from "./user"

export class Topic extends EventEmitter {
    
    constructor(topicName: string) {
        super()
        this.topicName = topicName
        this.users = []
        this.messages = []
    }
    
    private messages: string[]
    private users: User[]
    private topicName: string

    public getProperties() {
        return {
            user: this.users,
            name: this.topicName,
            message: this.messages
        }
    }

    public getUser(userToGet: string) {
        const user = this.getProperties().user.find((user) => user.getProperties().name === userToGet)
        if (! user) {
            throw new Error("User not found")
        }
        return user
    }
    
    public subscribeUser(newSubscribed: User) {
        this.users.push(newSubscribed)
        console.log(`The user ${newSubscribed.getProperties().name} has been subscribed to ${this.getProperties().name}'s topic`)
    }

    public postMessage(text: string, author: User) {
        const newMessage: string = text
        this.messages.push(newMessage)
        this.getProperties().user.forEach(user => {
            
            if(user !== author) {
                console.log(`[${this.getProperties().name} ---> ${user.getProperties().name}'s INBOX] ${author.getProperties().name} has published the following message: ${text}`)
                this.emit("Topic new message", text, author.getProperties().name)
            }
        })
    }
}
