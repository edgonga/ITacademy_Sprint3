const { EventEmitter } = require('events')
import { User } from "./user"

export class Topic extends EventEmitter {
    
    constructor(topicName: string) {
        super()
        this.topicName = topicName
        this.users = []
        this.messages = []
    }
    
    private messages: any[]
    private users: User[]
    private topicName: string

    public getProperties() {
        return {
            user: this.users,
            name: this.topicName,
            message: this.messages
        }
    }

    private sendWelcomeMessage () {
        const returnMessage = `The user ${this.getProperties().user} has been added to ${this.getProperties().name}'s topic`
        return returnMessage
    }
    
    public subscribeUser(alias: string) {
        const newUser = new User(alias)
        this.users.push(newUser)
        

        this.on()
    }

    public addMessage(text: string, author: User) {
        const newMessage: string = text
        this.messages.push(newMessage)
        this.emit("Topic new message", text, author)
    }
}