import { EventEmitter } from 'events'
import { User } from "./user"

export class Topic extends EventEmitter {

    constructor(topicName: string) {
        super()
        this.topicName = topicName
        this.users = new Set
        this.messages = []
    }

    private messages: string[]
    private users: Set<User>
    private topicName: string

    public getProperties() {
        return {
            user: this.users,
            name: this.topicName,
            message: this.messages
        }
    }

    public getUser(userToGet: string) {
        const user = Array.from(this.getProperties().user).find((user) => user.getProperties().name === userToGet)
        if (!user) {
            throw new Error("User not found")
        }
        return user
    }

    public postMessage(text: string, author: User) {
        if (this.users.has(author)) {
            const newMessage: string = text
            this.messages.push(newMessage)
            this.emit("Topic new message", newMessage, author)
        } else {
            throw new Error(`To add a message, the user needs to be subscribed first to the topic`)
        }

    }

    public subscribeUser(newSubscribed: User) {
        if (!this.users.has(newSubscribed)) {
            this.users.add(newSubscribed)
            console.log(`The user ${newSubscribed.getProperties().name} has been subscribed to ${this.getProperties().name}'s topic`)

            this.on("Topic new message", (newMessage: string, author: User) => {
                if (Array.from(this.users).includes(author) && newSubscribed !== author) {
                    console.log(`[${this.getProperties().name} ---> ${newSubscribed.getProperties().name}'s INBOX] ${author.getProperties().name} has published the following message: ${newMessage}`)
                }
            })
        } else {
            throw new Error(`You are adding a user who is already subscribed`);
            
        }
    }
}
