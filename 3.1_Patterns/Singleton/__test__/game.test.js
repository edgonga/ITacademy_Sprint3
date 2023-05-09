const { Game } = require("../app/Game")
const { Player } = require("../app/Players")

test("a player is added correctly into a game", () => {
    const game = new Game("Badminton")
    game.addPlayer("Carolina Marin")
    expect(game.getProperties().players.length).toBe(1)
    expect(game.getProperties().players[0].getProperties().name).toBe("Carolina Marin")
})

test("points are added and the property is updated with updatePlayers from the Game's part", () => {
    const game = new Game("Taboo")
    game.addPlayer("James Bond")
    game.addPlayer("Mortadelo")
    const playerToCheck = game.getPlayer("James Bond")
    playerToCheck.addPoints(222)
    expect(playerToCheck.getProperties().points).toBe(222)
})

test("an error is thrown when trying to substract points that produces negatives points", () => {
    const game = new Game("btt")
    game.addPlayer("Nino")
    const playerBTT = game.getPlayer("Nino")
    expect(() => playerBTT.subsPoints(10)).toThrowError("A player cannot has negative points")
})

test("after deleting a player using deletePlayer, it returns the players updated", () => {
    const game = new Game("Waterpolo")
    game.addPlayer("Bea Garcia")
    game.addPlayer("Eduardo Grandez")
    const playerToAppearFisrt = game.getPlayer("Eduardo Grandez")
    const playerToDelete = game.getPlayer("Bea Garcia")
    const updatePlayers = game.deletePlayer(playerToDelete)
    expect(updatePlayers.length).toBe(1)
    expect(updatePlayers[0].getProperties().name).toBe(playerToAppearFisrt.getProperties().name)
})

test("when getting a non-existing player an error is thrown", () => {
    const game = new Game("testGame")
    expect(() => game.getPlayer("nonexistentPlayer")).toThrowError("Player not found")
})