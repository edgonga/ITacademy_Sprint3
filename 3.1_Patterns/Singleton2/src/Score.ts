import { Player } from "./Players"
import { Game } from "./Game"

export class Score {
    private static instance: Score

    private constructor() {
        this.#game = []
    }

    public static getInstance(): Score {
        if(!Score.instance) {
            Score.instance = new Score
        }
        return Score.instance
    }

    #players: Player[]
    #game: Game []

    public showPoints(players: any) {
        const formatedPoints = this.#players.map((player) => {
            return {
                name: player.getProperties().name,
                points: player.getProperties().points,
                game: player.getProperties().game
            }
        })
    }

    public addNewGame(gameNaming: string) {
        const newGame = new Game(gameNaming)
        this.#game.push(newGame)
    }

    public deleteGame(gameNaming: string) {
        this.#game.filter(game => game.getProperties().game !== gameNaming)
    }

    public getGame(gameNaming: string) {
        const gameSelected = this.#game.find(game => gameSelected)
        return gameSelected
    }

    public showScoreboard () {
        this.#game.map((game) => {
            game.showPointsOfTheGame()
        })
        
    }
}