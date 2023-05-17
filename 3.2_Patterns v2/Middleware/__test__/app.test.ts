const { sum, multiply, divide } = require("./app")

test("functions operates correctly", () => {
    const resultSum = sum(1, 4)
    expect(resultSum).toBe(5)

    const resultMult = multiply(5, 5)
    expect(resultMult).toBe(25)

    const resultDiv = divide(10, 5)
    expect(resultDiv).toBe(2)
})

