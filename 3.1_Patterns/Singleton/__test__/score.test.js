const { Score }  = require ("../app/Score")

test("by using two times the getInstance method, both objects should be the same because of the singleton", () => {
    const score1 = Score.getInstance()
    const score2 = Score.getInstance()
    expect(score1).toBe(score2)
})

test("addNewGame method works properly", () => {
    const superBowl = Score.getInstance()
    superBowl.addNewGame("Super Bowl")
    const rugby = superBowl.getGame("Super Bowl")
    expect(superBowl.getProperties().game.length).toBe(1)
})

test("deleteGame method works properly", () => {
    const ironman = Score.getInstance()
    ironman.addNewGame("Ironman Hawaii")
    ironman.addNewGame("Ironman Hamburg")
    ironman.deleteGame("Ironman Hamburg")
    ironman.deleteGame("Super Bowl") // for this test, we should delete the previous games
    const firstIronman = ironman.getGame("Ironman Hawaii")
    expect(ironman.getProperties().game[ironman.getProperties().game.length -1].getProperties().game).toBe(firstIronman.getProperties().game)
    expect(ironman.getProperties().game.length).toBe(1)
})