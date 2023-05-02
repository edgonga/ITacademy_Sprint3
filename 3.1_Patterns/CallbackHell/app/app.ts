const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

const inbox: string = path.join(__dirname, 'inbox')
const outbox: string = path.join(__dirname, 'outbox')

function reverseText(text: string): string | void {
    if (typeof text !== "string") {
      return console.error("You should provide a string");
      
    }
    return text.split('').reverse().join('');
  }

async function writer (file: string, text: string) {
  try {
    const pathToWrite = path.join(outbox, file)
    await fsp.writeFile(pathToWrite, text)
} catch (err) {
  console.error("Error in writing the file");
  throw err
}
  
}

async function readerFile (file: string): Promise<string> {


  try {
    const data = fsp.readFile(path.join(inbox, file), "utf8")
    console.log("The file has been read correctly")
    return data
  } catch (err) {
    console.error("Error in reading the file");
    throw err
  }
}
 async function readerDir (): Promise<string> {
  try {
    return await fsp.readdir(inbox)
  } catch (err) {
    console.error("Error in reading the directory");
    throw err
  }
}

type ReaderDir = () => Promise<string[]>;
type ReaderFile = (file: string) => Promise<string>;
type Writer = (file: string, text: string) => Promise<void>;
type Reverser = (text: string) => string;

async function processFiles(readerDir: Function, readerFile: ReaderFile, writer: Writer, reverser: Function): Promise<void> {
  try {
    if (!fs.existsSync(inbox)) throw new Error("The inbox directory does not exist")
    if (!fs.existsSync(outbox)) throw new Error("The outbox directory does not exist")
    if (!fs.statSync(outbox).isDirectory()) throw new Error("The outbox path is not a directory")
    const files: string[] = await readerDir()

     if (!files.length) throw new Error ("The inbox directory is empty")
    for (const file of files) {
      const data: string = await readerFile(file);

      const reversedText = reverser(data)
    
      await writer(file, reversedText)

      console.log(`${file} was successfully saved in the outbox!`);
    } 
  } catch (error) {
    console.log(error);
  }
}

// processFiles(readerDir, readerFile, writer, reverseText)


 module.exports = {
  reverseText,
  processFiles,
  inbox,
  outbox,
  writer,
  readerDir,
  readerFile
} 




