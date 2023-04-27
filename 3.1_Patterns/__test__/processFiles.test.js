const {processFiles} = require("../app/app")
const {inbox} = require("../app/app")
const {outbox} = require("../app/app")
const fs = require('fs/promises')
const path = require('path')

// In order to proceed with this test, we must be sure that the inbox folder is empty
// so we construct two ways to eliminate all the files and folders inside inbox
test("when the function finds an empty folder, the error is displayed", async() => {
    // First way, with Promises
    fs.readdir(inbox)
        .then(files => {
            const deleteFiles = files.map(file => {
                const filePath = path.join(inbox, file)
                return fs.unlink(filePath)
            })
            return Promise.all(deleteFiles)
        })
        .then(() => {
            console.log("Files deleted correctly")
        })
        .catch((err) => {
            console.error(`Error when deleting the files: ${err.message}`);
        })
    // Second way, with rimraf
    const consoleSpy = jest.spyOn(console, "log")
    await processFiles()
    expect(consoleSpy).toHaveBeenCalledWith(new Error("The inbox directory is empty"))
})

test("test that the function creates the files in the proper directory and with the data reversed", async() => {
    const fileName1 = "test1.txt"
    const fileName2 = "test2.txt"
    const fileData1 = "Carlos Alcaraz"
    const fileData2 = "Fernando Alonso"
    await fs.writeFile(path.join(inbox, fileName1), fileData1)
    await fs.writeFile(path.join(inbox, fileName2), fileData2)

    await processFiles()
    
    const outboxFile1 = await fs.readFile(path.join(outbox, fileName1), "utf8")
    const outboxFile2 = await fs.readFile(path.join(outbox, fileName2), "utf8")
    expect(outboxFile1).toEqual(reverseText(fileData1))
    expect(outboxFile2).toEqual(reverseText(fileData2))
    await fs.unlink(path.join(inbox, fileName1))
    await fs.unlink(path.join(inbox, fileName2))
    await fs.unlink(path.join(outbox, fileName1))
    await fs.unlink(path.join(outbox, fileName2))
})

