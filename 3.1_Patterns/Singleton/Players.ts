export class Player {
    private name: string
    private game!: string 
    private points!: number

    constructor(name: string) {
        this.name = name
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