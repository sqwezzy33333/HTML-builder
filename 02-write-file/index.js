const fs = require('fs');
const path = require('path');
const process = require('process');

const filePath = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(filePath);
 fs.writeFile(filePath, '', (err) => {
   if (err) {
     throw err;
   }
 });

process.stdout.write('Hello! Enter your text: ');
process.stdin.setEncoding('utf-8').on('data', (data) => {
  if (data.trim() == 'exit') {
    process.stdout.write('This is end ');
    process.exit();
  } else {
    writeStream.write(data);
  }
});
process.on('SIGINT', () => {
  process.stdout.write('\nThis is end ');
  process.exit();
});