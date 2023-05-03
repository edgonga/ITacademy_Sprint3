export class Player {
    #name
    #game
    #points
    constructor(name, game, points) {
        this.#name = this.#validateString(name)
        this.#game = this.#validateString(game)
        this.#points = this.#validateNumber(points)
    }

    #validateString(property) {
        if(!property) throw Error("name or game property are missing")
        if(typeof property !== "string") throw Error("you must add a string")
    }

    #validateNumber(property) {
        if(!property) throw Error("points property is missing")
        if(typeof property !== "number") throw Error("you must add a number")
    }

    getProperties() {
        return {
            name: this.#name,
            game: this.#game,
            points: this.#points
        }
    }

    addPlayerPoints(pointsToAdd) {
        this.#points = this.#validateNumber(pointsToAdd) + this.#points
    }
    
    subsPlayerPoints(pointsToRest) {
        this.#points = this.#validateNumber(pointsToRest) + this.#points
    }
}