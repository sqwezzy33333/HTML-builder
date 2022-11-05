const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');

fs.createReadStream(filePath)
  .setEncoding('utf-8')
  .on('error', (err) => console.log(err))
  .on('data', (chunk) => {
    console.log(chunk);
  });