
export class User {
    
    constructor(userName: string) {
        this.userName = userName
        this.id = User.incrementalIndex
        User.incrementalIndex ++
    }
 
    private static incrementalIndex: number = 0
    private userName: string
    private id: number = User.incrementalIndex

    public getProperties() {
        return {
            name: this.userName,
            id: this.id
        }
    }
}