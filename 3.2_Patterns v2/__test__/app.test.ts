const { operate } = require("../app/app")

test("function can add two numbers", () => {
    const result = operate(2, 3, (a: number, b: number) => a + b);
    expect(result).toBe(5);
})