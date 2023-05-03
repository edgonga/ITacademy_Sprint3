const {readerFile} = require("../app/app")
const path = require('path')

test("returns the data correctly", async() => {
    const data = "React & Angular"
    const file = "frontend.txt"
    jest.spyOn(fsp, "readFile").mockResolvedValue(data)
    const output = await readerFile(file)
    expect(output).toEqual(data)
})

test("it throws an error if reading a non-existing file", async() => {
    const nonExistingFile = "facturas.txt"
    jest.spyOn(fsp, "readFile").mockResolvedValue(new Error("File not found"))
    await expect(readerFile(nonExistingFile)).rejects.toThrow("File not found")
})