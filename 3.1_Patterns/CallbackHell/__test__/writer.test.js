const {writer} = require("../app/app")
const path = require('path')

test("Tests that the writer function throws an error if the file name is invalid", async () => {
    const invalidFileName = "invalid/file/name.txt"
    const text = "text"

    await expect(writer(invalidFileName, text)).rejects.toThrow()
})

test("It throws an error if the directory does not exist", async() => {
    const nonexistingPath = path.join(__dirname, "nonexisting")
    const file = "testDir.txt"
    const testPath = "testing directory"
    const filePath = path.join(nonexistingPath, file)

    await expect(writer(filePath, testPath)).rejects.toThrowError("ENOENT: no such file or directory, open 'C:\\Users\\formacio\\Documents\\ITacademy_Sprint3\\3.1_Patterns\\CallbackHell\\app\\outbox\\C:\\Users\\formacio\\Documents\\ITacademy_Sprint3\\3.1_Patterns\\CallbackHell\\__test__\\nonexisting\\testDir.txt")
})





 
