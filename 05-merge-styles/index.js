const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'styles'), (err, data) => {
  if (err) throw err;
  fs.stat(path.join(__dirname, 'project-dist', 'bundle.css'), (err) => {
    if (err) {
      return false;
    } else {
      fs.unlink(path.join(__dirname, 'project-dist', 'bundle.css'), function (err) {
        if (err) {
          throw err;
        } else {
        }
      });
    }
  });

  data.forEach((item) => {
    let filePath = path.join(__dirname, 'styles', item);
    fs.stat(filePath, (err, stats) => {
      if (err) throw err;
      if (stats.isFile() && path.extname(filePath) === '.css') {
        fs.readFile(filePath, (err, data) => {
          fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), data, (err) => {
            if (err) throw err;
          });
        });
      }
    });
  });
});