const {
    writer
} = require("../app/app")
const path = require('path')

// test("Error is logged when trying to write a file to a directory that does not exist", async () => {
//     const fileName = "test.txt";
//     const fileText = "Hello, world!";
//     const invalidPath = "invalid/path"
//     const pathMock = jest.spyOn(path, 'join').mockReturnValueOnce(invalidPath);
//     console.error = jest.fn();
//     await writer(fileName, fileText);
//     expect(console.error).toHaveBeenCalledWith(`Error writing file ${path.join(invalidPath, fileName)}: Error: ENOENT: no such file or directory`);
//     pathSpy.mockRestore();
// })


test("Error is logged when trying to write a file to a directory that does not exist", async () => {
    const fileName = "test.txt";
    const fileText = "Hello, world!";
    const invalidPath = "invalid/path"
    const pathMock = jest.spyOn(path, 'join').mockReturnValueOnce(invalidPath);
    console.error = jest.fn(); 
    await expect(writer(fileName, fileText)).toHaveBeenCalledWith(`ENOENT: no such file or directory, open ${path.join(__dirname ,invalidPath)}`)
    pathMock.mockRestore();
})
 
test("Tests that the writer function throws an error if the file name is invalid", async () => {
    const invalidFileName = "invalid/file/name.txt";
    const text = "text";

    await expect(writer(invalidFileName, text)).rejects.toThrow("ENOENT");
});