import { number, string } from "yargs"
import { Player } from "./Players"
import { Score } from "./Score"

export class Game {
    
    
    constructor(gameNaming: string) {
        this.gameNaming = gameNaming
        this.players = []
    }

    private players: Player[]
    private gameNaming: string

    public getProperties() {
        return {
            game: this.gameNaming,
            players: this.players
        }
    }

    public getPlayer(playerToGet: Player) {
        const player = this.players.find((player) => player.getProperties().name === playerToGet.getProperties().name)
        return player
    }

    private updatePlayer(playerUpdated: Player) {
        this.players = this.players.filter(player => player.getProperties().name !== playerUpdated.getProperties().name)
        this.players.push(playerUpdated)

    }

    public addPlayer(namePlayer: string) {
        const player = new Player(namePlayer)
        this.players.push(player)
    }

    public deletePlayer(playerToDelete: Player) {
        this.players.filter(player => player.getProperties().name !== playerToDelete.getProperties().name)
        return this.players
    }

    public addPoints(playerToAdd: Player, points: number) {
        const playerSelected = this.players.find(player => player.getProperties().name === playerToAdd.getProperties().name)
        playerSelected?.addPlayerPoints(points)
        this.updatePlayer(playerToAdd) // Is this correct or should I put playerSelected???
    }

    public subsPoints(playerToSubs: Player, points: number) {
        const playerSelected = this.players.find(player => player.getProperties().name === playerToSubs.getProperties().name)
        playerSelected?.subsPlayerPoints(points)
        this.updatePlayer(playerToSubs)
    }

    public showPointsOfTheGame() {
        let winner: Player | null = null
        let maxPoints: number = 0
        this.players.map((player: Player) => {
            console.log({
                name: player.getProperties().name,
                points: player.getProperties().points,
                game: this.gameNaming,
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