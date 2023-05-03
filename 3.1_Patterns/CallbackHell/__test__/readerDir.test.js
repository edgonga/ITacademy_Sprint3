const {readerDir} = require ("../app/app")
const path = require("path")
const fs = require('fs')
const fsp = fs.promises

test("it returns an array of existing files when behaves as planned", async() => {
    const expectedFiles = ["saturno.txt", "urano.txt", "pluton.txt"]
    jest.spyOn(fsp, "readdir").mockResolvedValue(expectedFiles)
    const output = await readerDir()
    expect(output).toEqual(expectedFiles)
})

test("throws an error when the inbox directory does not exist", async() => {
    jest.spyOn(fsp, "readdir").mockRejectedValue(new Error("Error in reading the directory"))
    await expect(readerDir()).rejects.toThrow("Error in reading the directory")
})