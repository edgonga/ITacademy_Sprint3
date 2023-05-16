const { MathMiddleware } = require("../app/MathsMiddleware")

test("console log inside SQUAREMIDDLEWARE has been called with the correct parameters", () => {
    const squareMiddleware = new MathMiddleware(5, 8)
    const consoleSpy = jest.spyOn(console, "log")
    squareMiddleware.squareMiddleware()
    expect(squareMiddleware.num1).toBe(25)
    expect(squareMiddleware.num2).toBe(64)
    expect(consoleSpy).toHaveBeenCalledWith("Calculating square of 5.00 and 8.00")
    expect(consoleSpy).toHaveBeenCalledWith(`THE SQUARES ARE: 25.00 and 64.00`)
})

test("console log inside DIVIDEBYTWOMIDDLEWARE has been called with the correct parameters", () => {
    const divideMiddleware = new MathMiddleware(200, 42)
    const divideNextFunc = jest.fn()
    const consoleSpy = jest.spyOn(console, "log")
    divideMiddleware.divideByTwoMiddleware(divideNextFunc)
    expect(divideMiddleware.num1).toBe(100)
    expect(divideMiddleware.num2).toBe(21)
    expect(consoleSpy).toHaveBeenCalledWith("Dividing 200.00 and 42.00 by 2")
    expect(consoleSpy).toHaveBeenCalledWith(`THE DIVISIONS BY 2 ARE: 100.00 and 21.00`)
})

test("console log inside CUBEMIDDLEWARE has been called with the correct parameters", () => {
    const cubeMiddleware = new MathMiddleware(3.5, 0.75)
    const cubeNextFunc = jest.fn()
    const consoleSpy = jest.spyOn(console, "log")
    cubeMiddleware.cubeMiddleware(cubeNextFunc)
    expect(cubeMiddleware.num1).toBe(42.875)
    expect(cubeMiddleware.num2).toBe(0.421875)
    expect(consoleSpy).toHaveBeenCalledWith("Calculating cube of 3.50 and 0.75")
    expect(consoleSpy).toHaveBeenCalledWith(`THE CUBES ARE: 42.88 and 0.42`)
})