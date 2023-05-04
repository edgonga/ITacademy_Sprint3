import { Score } from "./Score"
import { Player } from "./Players"
import { Game } from "./Game"

const scoreboard = Score.getInstance()

scoreboard.addNewGame("Tetris")
const tetris = scoreboard.getGame("Tetris")
tetris.addPlayer("Michael Schumacher")
tetris.addPlayer("Marc Marquez")
tetris.addPoints("Marc Marquez", 78)
tetris.addPoints("Michael Schumacher", 168)
tetris.subsPoints("Michael Schumacher", 12)
scoreboard.addNewGame("Paintball")
const paintball = scoreboard.getGame("Paintball")
paintball.addPlayer("Jack Sparrow")
paintball.addPoints("Jack Sparrow", 47)
scoreboard.showScoreboard()



