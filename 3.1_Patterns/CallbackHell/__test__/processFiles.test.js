const {processFiles, readerFile, readerDir, writer, reverseText} = require("../app/app")
const {inbox} = require("../app/app")
const {outbox} = require("../app/app")
const fs = require('fs/promises')
const path = require('path')



test("test that the function creates the files in the proper directory and with the data reversed", async() => {
    const fileName1 = "test1.txt"
    const fileName2 = "test2.txt"
    const fileData1 = "Carlos Alcaraz"
    const fileData2 = "Fernando Alonso"
    await fs.writeFile(path.join(inbox, fileName1), fileData1)
    await fs.writeFile(path.join(inbox, fileName2), fileData2)

    await processFiles(readerDir, readerFile, writer, reverseText)
    
    const outboxFile1 = await fs.readFile(path.join(outbox, fileName1), "utf8")
    const outboxFile2 = await fs.readFile(path.join(outbox, fileName2), "utf8")
    expect(outboxFile1).toEqual(reverseText(fileData1))
    expect(outboxFile2).toEqual(reverseText(fileData2))
    await fs.unlink(path.join(inbox, fileName1))
    await fs.unlink(path.join(inbox, fileName2))
    await fs.unlink(path.join(outbox, fileName1))
    await fs.unlink(path.join(outbox, fileName2))
})

test("the four functions parameters are called with the proper parameters when the main function works smoothly", async () => {
    const mockReaderDir = jest.fn().mockResolvedValue(["file1.txt", "file2.txt"]);
    const mockReaderFile = jest.fn().mockResolvedValue("hello world");
    const mockWriter = jest.fn();
    const mockReverser = jest.fn().mockReturnValue("dlrow olleh");

    await processFiles(mockReaderDir, mockReaderFile, mockWriter, mockReverser);

    expect(mockReaderDir).toHaveBeenCalled();
    expect(mockReaderFile).toHaveBeenCalledWith("file1.txt");
    expect(mockReaderFile).toHaveBeenCalledWith("file2.txt");
    expect(mockReverser).toHaveBeenCalledWith("hello world");
    expect(mockWriter).toHaveBeenCalledWith("file1.txt", "dlrow olleh");
    expect(mockWriter).toHaveBeenCalledWith("file2.txt", "dlrow olleh");
});


test('if the inbox is empty, only the readerDir function parameter is called, none of the rest of three are called', async () => {

    const mockReaderDir = jest.fn(() => [])
    // Those two lines are they equivalent?
    const mockReaderDirEquivalent = jest.fn().mockResolvedValue([])
    const mockReaderFile = jest.fn()
    const mockReverser = jest.fn()
    const mockWriter = jest.fn()

    await processFiles(mockReaderDirEquivalent, mockReaderFile, mockWriter, mockReverser)

    expect(mockReaderDirEquivalent).toHaveBeenCalled()
    expect(mockReaderFile).not.toHaveBeenCalled()
    expect(mockWriter).not.toHaveBeenCalled();
    expect(mockReverser).not.toHaveBeenCalled();

})

test('it throws the corresponding error when inbox is empty', async () => {

    const mockReaderDir = jest.fn().mockResolvedValue([])
    const mockReaderFile = jest.fn()
    const mockReverser = jest.fn()
    const mockWriter = jest.fn()

    try {

        await processFiles(mockReaderDir, mockReaderFile, mockWriter, mockReverser)

    } catch ({
        message
    }) {

        expect(message).toBe("The inbox directory is empty")
    }

})



