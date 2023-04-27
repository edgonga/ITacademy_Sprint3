const fs = require('fs');
const path = require('path');

const inbox: string = path.join(__dirname, '../inbox')
const outbox: string = path.join(__dirname, '../outbox')

function reverseText(text: string): string | void {
    if (typeof text !== "string") {
      return console.error("You should provide a string");
      
    }
    return text.split('').reverse().join('');
  }

async function writer (file: string, text: string) {

  const pathToWrite = path.join(outbox, file)

  await fs.writeFile(pathToWrite, text);
}

async function readerFile (file: string) {
  return await fs.readFile(path.join(inbox, file), 'utf8');
}

async function readerDir () {
  return await fs.readdir(inbox)
}

type ReaderDir = () => Promise<string[]>;
type ReaderFile = (file: string) => Promise<string>;
type Writer = (file: string, text: string) => Promise<void>;
type Reverser = (text: string) => string;

async function processFiles(readerDir: ReaderDir, readerFile: ReaderFile, writer: Writer, reverser: Reverser): Promise<void> {
  try {
    if (!fs.existsSync(inbox)) throw new Error("The inbox directory does not exist")
    if (!fs.existsSync(outbox)) throw new Error("The outbox directory does not exist")
    if (!fs.statSync(outbox).isDirectory()) throw new Error("The outbox path is not a directory")
    const files: string[] = await readerDir()
    if (!files.length) throw new Error ("The inbox directory is empty")

    for (const file of files) {
      const data: string = await readerFile(file);

      const reverserdText = reverser(data)
    
      await writer(file, reverserdText)

      console.log(`${file} was successfully saved in the outbox!`);
    }
  } catch (error) {
    console.log(error);
  }
}

//processFiles();

module.exports = {
  reverseText,
  processFiles,
  inbox,
  outbox,
  writer
}




