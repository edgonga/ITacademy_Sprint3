import { Game } from "./Game"

export class Player {
    private readonly name: string
    private game: string 
    private points: number

    constructor(name: string) {
        this.name = name
        this.points = 0,
        this.game = ""
    }

    public getProperties() {
        return {
            name: this.name,
            game: this.game,
            points: this.points
        }
    }

    mainGame!: Game

    public addPoints(pointsToAdd: number) {
        if (!this.mainGame) {
            throw new Error("This player has not game that has been included")
        }
        this.points += pointsToAdd
        this.mainGame?.updatePlayer(this)
    }
    
    public subsPoints(pointsToSubs: number) {
        if (typeof this.mainGame === "undefined") {
            throw new Error("This player has not game that has been included")
        }
        this.points -= pointsToSubs
        if (this.getProperties().points < 0) {
            this.addPoints(pointsToSubs)
            throw new Error("A player cannot has negative points")
        }
        this.mainGame?.updatePlayer(this)
    }
    public toString() {
        return `name: ${this.name}<br>
        game: ${this.game}<br>
        points: ${this.points}`
    }
}