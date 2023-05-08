const { Player } = require("../app/Players")
const { Game } = require("../app/Game")

test("addPoints method adds points and updates the player correctly", () => {
    const game = new Game("Pelota vasca")
    const player = new Player("Uritz")
    player.mainGame = game
    player.addPoints(10)
    expect(player.getProperties().points).toBe(10)
    expect(game.getPlayer("Uritz").getProperties().points).toBe(10)
})

test("subsPoints method substracts points and updates the player correctly", () => {
    const game = new Game("LOL")
    const player = new Player("Ibai Llanos")
    player.mainGame = game
    player.addPoints(17)
    player.subsPoints(7)
    expect(player.getProperties().points).toBe(10)
    expect(game.getPlayer("Ibai Llanos").getProperties().points).toBe(10)
})

test("if addPoints is used without setting a game in advance, an error is launched", () => {
    const player = new Player("Mr. Alone")
    expect(() => player.addPoints(22)).toThrowError("This player has not game that has been included")
})

test("if subsPoints is used without setting a game in advance, an error is launched", () => {
    const player = new Player("Mr. Alone")
    expect(() => player.subsPoints(22)).toThrowError("This player has not game that has been included")
})

test("if a player gets negative points by applying the subsPoints method, an error is throw and the positive points are restored accesing by game or player, to be sure that updatePlayers is working as expected", () => {
    const game = new Game("Fast & Furious")
    const player = new Player("Toreto")
    player.mainGame = game
    player.addPoints(10)
    expect(() => player.subsPoints(20).toThrowError("A player cannot has negative points"))
    expect(player.getProperties().points).toBe(10)
    expect(game.getPlayer("Toreto").getProperties().points).toBe(10)
})