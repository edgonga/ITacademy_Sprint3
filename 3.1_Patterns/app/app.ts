const fs = require('fs/promises');
const path = require('path');

const inbox: string = path.join(__dirname, '../inbox')
const outbox: string = path.join(__dirname, '../outbox')

function reverseText(text: string): string {
    if (typeof text !== "string") {
      console.error("You should provide a string");
      
    }
    return text.split('').reverse().join('');
  }

async function processFiles(): Promise<void> {
  try {

    const files: string[] = await fs.readdir(inbox);
    for (const file of files) {
      const data: string = await fs.readFile(path.join(inbox, file), 'utf8');
      await fs.writeFile(path.join(outbox, file), reverseText(data));
      console.log(`${file} was successfully saved in the outbox!`);
    }
  } catch (error) {
    console.log(error);
  }
}

//processFiles();

module.exports = {
  reverseText,
  processFiles
}




