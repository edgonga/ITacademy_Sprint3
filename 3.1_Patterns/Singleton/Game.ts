import { Player } from "./Players"
import { Score } from "./Score"

export class Game {
    #gameNaming
    private static score: Score
    constructor(gameNaming) {
        this.#gameNaming = gameNaming
        this.players = []
    }

    players: Player[]
    score: Score

    addPlayer(namePlayer, gameNaming, points) {
        const player = new Player(namePlayer, gameNaming, points)
        return this.players
    }

    deletePlayer(namePlayer) {
        this.players.filter(player => player.getProperties().name !== namePlayer)
        return this.players
    }

    



}