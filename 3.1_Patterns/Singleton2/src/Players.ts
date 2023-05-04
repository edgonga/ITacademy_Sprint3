export class Player {
    private name: string
    private game: string
    private points: number
    constructor(name: string, game: string, points: number) {
        this.name = this.validateString(name)
        this.game = this.validateString(game)
        this.points = this.validateNumber(points)
    }

    private validateString(property: string) {
        if(!property) throw Error("name or game property are missing")
        if(typeof property !== "string") throw Error("you must add a string")
    }

    private validateNumber(property: string) {
        if(!property) throw Error("points property is missing")
        if(typeof property !== "number") throw Error("you must add a number")
    }

    getProperties() {
        return {
            name: this.name,
            game: this.game,
            points: this.points
        }
    }

    addPlayerPoints(pointsToAdd: number) {
        this.points = pointsToAdd + this.points
    }
    
    subsPlayerPoints(pointsToRest: number) {
        this.points = pointsToRest - this.points
    }
    toString() {
        return {
            name: this.name,
            game: this.game,
            points: this.points
        }
    }
}