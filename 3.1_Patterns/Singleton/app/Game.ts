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

    public updatePlayer(playerUpdated: Player) {
        this.players = this.players.filter(player => player.getProperties().name !== playerUpdated.getProperties().name)
        this.players.push(playerUpdated)
    }

    public getPlayer(playerToGet: string) {
        const player = this.players.find((player) => player.getProperties().name === playerToGet)
        if (! player) {
            throw new Error("Player not found")
        }
        return player
    }

    public addPlayer(namePlayer: string): void {
        const player = new Player(namePlayer)
        this.players.push(player)
        player.mainGame = this
    }

    public deletePlayer(playerToDelete: Player) {
        this.players.filter(player => player.getProperties().name !== playerToDelete.getProperties().name)
        this.updatePlayer(playerToDelete)
        return this.players
    }

    public showPointsOfTheGame() {
        let winner
        let maxPoints: number = 0
        this.players.map((player: Player) => {
            console.log({
                space: "-------------------------",
                name: player.getProperties().name,
                points: player.getProperties().points,
                game: this.gameNaming
                
            })
            if (player.getProperties().points > maxPoints) {
                maxPoints = player.getProperties().points
                winner = player.getProperties().name
            }
            
        })
            console.log("The winner is: ");
            console.log(winner);
    }
}