const { EventEmitter } = require('events') 

let incrementalIndex: number = 0
export class User {
    
    constructor(userName: string) {
        this.userName = userName
        this.id = incrementalIndex
        incrementalIndex ++
    }

    private userName: string
    private id: number

    public getProperties() {
        return {
            name: this.userName,
            id: this.id
        }
    }
}