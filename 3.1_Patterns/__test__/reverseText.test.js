const {reverseText} = require("../app/app")

test("it outcomes the reverse string properly", () => {
    const output = reverseText("good morning")
    expect(output).toEqual("gninrom doog")
})

test("it handles an empty string as a parameter", () => {
    const output = reverseText("")
    expect(output).toEqual("")
})

test('it throws an error when a string is not provided ', () => {
    const consoleSpy = jest.spyOn(console, "error")
    reverseText(12)
    expect(consoleSpy).toHaveBeenCalledWith("You should provide a string")
})


test("test a very long string", () => {
    const input = "a".repeat(1000000);
    const expectedOutput = input.split('').reverse().join('');
    const actualOutput = reverseText(input);
    expect(actualOutput).toEqual(expectedOutput);
});