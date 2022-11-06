const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'files-copy'), 'utf-8', (err, data) => {
  if (err) {
    return false;
  }

  data.forEach((file) => {
    let filePath = path.join(__dirname, 'files-copy', file);

    fs.unlink(filePath, (err) => {
      if (err) return false;
    });
  });
});

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
  if (err) {
    return console.error(err);
  }

  fs.readdir(path.join(__dirname, 'files'), (err, data) => {
    if (err) {
      throw err;
    }
    data.forEach((file) => {
      fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), (err) => {
        if (err) throw err;
      });
    });
  });
  console.log('Папка скопирована !');
});