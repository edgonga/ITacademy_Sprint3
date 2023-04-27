const {
    processFiles
} = require("../app/app")
const fs = require("fs")
const path = require("path")


/* jest.mock("fs", () => ({
    writeFile: jest.fn()
}))

jest.mock("path", () => ({
    join: jest.fn(() => 'fake_route/file.txt')
}))

function prove (a, b) {
   
    const text = b()
    fs.writeFile(a, text)
} */


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