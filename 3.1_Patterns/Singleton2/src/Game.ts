import { Player } from "./Players"
import { Score } from "./Score"

export class Game {
    
    
    constructor(gameNaming: string) {
        this.#gameNaming = gameNaming
        this.#players = []
    }

    #players: Player[]
    #gameNaming: string

    getProperties() {
        return {
            game: this.#gameNaming,
            players: this.#players
        }
    }

    public addPlayer(namePlayer: string, gameNaming: string, points: number) {
        const player = new Player(namePlayer, gameNaming, points)
        this.#players.push(player)
    }

    deletePlayer(namePlayer: string) {
        this.#players.filter(player => player.getProperties().name !== namePlayer)
        return this.#players
    }

    addPoints(namePlayer: string, points: number) {
        const playerSelected = this.#players.find(player => player.getProperties().name === namePlayer)
        playerSelected?.addPlayerPoints(points)
    }

    subsPoints(namePlayer: string, points: number) {
        const playerSelected = this.#players.find(player => player.getProperties().name === namePlayer)
        playerSelected?.subsPlayerPoints(points)
    }

    showPointsOfTheGame() {
        let winner: Player | null = null
        let maxPoints = 0
        this.#players.map((player: Player) => {
            console.log({
                name: player.getProperties().name,
                points: player.getProperties().points,
                game: player.getProperties().game,
                space: "-------------------------"
            })
            if (player.getProperties().points > maxPoints) {
                maxPoints = player.getProperties().points
                winner = player
            }
            
        })
     
            console.log(winner);
    }
}