import { Score } from "./Score"
import { Player } from "./Players"
import { Game } from "./Game"

const scoreboard = Score.getInstance()

scoreboard.addNewGame("Tetris") 
const tetris = scoreboard.getGame("Tetris")
tetris?.addPlayer("Michael Schumacher")
tetris?.addPlayer("Marc Marquez")
const playerF1 = tetris?.getPlayer("Michael Schumacher")
const playerGP = tetris?.getPlayer("Marc Marquez")
playerF1?.addPoints(37)
playerGP?.addPoints(168)
playerGP?.subsPoints(12)
scoreboard.addNewGame("Paintball")
const paintball = scoreboard.getGame("Paintball")
paintball?.addPlayer("Jack Sparrow")
const jackSparrow = paintball?.getPlayer("Jack Sparrow")
jackSparrow?.addPoints(47)
scoreboard.deleteGame("Paintball")
scoreboard.showScoreboard()



