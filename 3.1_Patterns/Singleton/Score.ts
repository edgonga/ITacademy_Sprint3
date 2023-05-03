import { Player } from "./Players"
import { Game } from "./Game"

export class Score {
    private static instance: Score

    private constructor() {

    }

    public static getInstance(): Score {
        if(!Score.instance) {
            Score.instance = new Score
        }
        return Score.instance
    }

    players: Player[]
    game: Game

    public showPoints(players: any) {
        const formatedPoints = this.players.map((player) => {
            return {
                player.getProperties().name,
                player.getProperties().points
            }
        })
    }
}