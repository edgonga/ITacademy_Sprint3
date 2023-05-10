const { EventEmitter } = require('events')
import { text } from "stream/consumers"
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

    private sendWelcomeMessage () {
        const returnMessage = `The user ${this.getProperties().user} has been subscribed to ${this.getProperties().name}'s topic`
        return returnMessage
    }

    public getUser(userToGet: string) {
        const user = this.getProperties().user.find((user) => user.getProperties().name === userToGet)
        if (! user) {
            throw new Error("User not found")
        }
        return user
    }
    
    private subscribeExistingUser(newSubscribed: User) {
        this.users.push(newSubscribed)
        console.log(this.sendWelcomeMessage)

        this.on("Topic new message", (text: string, author: string) => {
            if (this.getProperties().user.toString() !== author) {
                console.log(`[${this.getProperties().name}] Hi ${this.getProperties().user}, you have a new message from ${author}: ${text}`)
            }
        })
    }
    
    private subscribeNewUser(newSubscribed: string) {
        if (this.getProperties().user.find((user) => user.getProperties().name !== newSubscribed)) {
            const newUser = new User(newSubscribed)  
            this.users.push(newUser)
        
        }
        console.log(this.sendWelcomeMessage)

        this.on("Topic new message", (text: string, author: string) => {
            if (this.getProperties().user.toString() !== author) {
                console.log(`[${this.getProperties().name}] Hi ${this.getProperties().user}, you have a new message from ${author}: ${text}`)
            }
        })
    }

    public subscribeUser(subscription: User | string) {
        if (subscription instanceof User) {
            this.subscribeExistingUser(subscription)
        }
        if (typeof subscription === "string") {
            this.subscribeNewUser(subscription)
        }
    }

    public postMessage(text: string, author: User) {
        const newMessage: string = text
        this.messages.push(newMessage)
        this.getProperties().user.forEach(user => {
            console.log(`[${this.getProperties().name}] ${author} has published the following message: ${text}`);
            if(user !== author) {
                console.log(`[${this.getProperties().name}] Hi ${user}, you have a new message from ${author}`)
                this.emit("Topic new message", text, author.getProperties().name)
            }
        })
    }
}