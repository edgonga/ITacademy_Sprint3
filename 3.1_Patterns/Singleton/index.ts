import { Score } from "./Score"
import { Player } from "./Players"
import { Game } from "./Game"

const scoreboard = Score.getInstance()

scoreboard.addNewGame("Tetris")
const tetris = scoreboard.getGame("Tetris")
const playerF1 = tetris?.addPlayer("Michael Schumacher")
const playerGP = tetris?.addPlayer("Marc Marquez")
tetris?.addPoints(playerF1, 78)
tetris?.addPoints(playerGP, 168)
tetris?.subsPoints(playerGP, 12)
scoreboard.addNewGame("Paintball")
const paintball = scoreboard.getGame("Paintball")
paintball?.addPlayer("Jack Sparrow")
paintball?.addPoints("Jack Sparrow", 47)
scoreboard.showScoreboard()



