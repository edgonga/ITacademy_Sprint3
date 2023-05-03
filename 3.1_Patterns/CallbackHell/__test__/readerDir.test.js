const {readerDir} = require ("../app/app")
const path = require("path")

test("it throws an error when the inbox directory does not exist", async() => {
    const inboxNonexistingPath = path.join(__dirname, "nonexisting")
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {})
    await expect(readerDir(inboxNonexistingPath)).rejects.toThrow("Error in reading the directory")
    expect(consoleSpy).toHaveBeenCalledWith("Error in reading the directory")
})