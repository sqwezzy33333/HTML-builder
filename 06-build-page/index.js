const fs = require('fs');
const path = require('path');
const pathToAssetsFolder = path.join(__dirname, 'assets');
const pathToProjectDist = path.join(__dirname, 'project-dist', 'assets');

build();

async function build() {
  await deleteOldFolders();
  await createFolders();
  replaceHTMLtemplates();
  copyFolder(pathToAssetsFolder, pathToProjectDist);
  cssBundle();
};

async function deleteOldFolders() {
  try {
    await fs.promises.access(path.join(__dirname, 'project-dist'));
    await fs.promises.rm(path.join(__dirname, 'project-dist'), { recursive: true });
  } catch (err) {
    return false;
  };
};

async function createFolders() {
  try {
    await fs.promises.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });
    await fs.promises.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true });
  } catch (err) {
    throw err;
  };
};

function replaceHTMLtemplates() {
  fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data) => {
    let HTMLinner = data;
    fs.readdir(path.join(__dirname, 'components'), (err, files) => {
      files.forEach((file) => {
        if (HTMLinner.includes(`{{${path.parse(file).name}}}`)) {
          fs.readFile(path.join(__dirname, 'components', file), 'utf-8', (err, fileContent) => {
            HTMLinner = HTMLinner.replace(`{{${path.parse(file).name}}}`, fileContent);
            fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), HTMLinner, (err) => {
              if (err) throw err;
            });
          });
        }
      });
    });
  });
};

function cssBundle() {
  fs.readdir(path.join(__dirname, 'styles'), (err, data) => {
    if (err) throw err;
    fs.stat(path.join(__dirname, 'project-dist', 'style.css'), (err) => {
      if (err) {
        return false;
      } else {
        fs.unlink(path.join(__dirname, 'project-dist', 'style.css'), function (err) {
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
            fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), data, (err) => {
              if (err) throw err;
            });
          });
        }
      });
    });
  });
};

function copyFolder(pathToFile, pathDest) {
  //  функция для рекурсивное копирование любой папки
  fs.readdir(pathToFile, (err, data) => {
    if (err) throw err;
    data.forEach((item) => {
      fs.stat(path.join(pathToFile, item), (err, file) => {
        if (file.isFile()) {
          // console.log('file:', item);
          fs.copyFile(path.join(pathToFile, item), path.join(pathDest, item), (err) => {
            if (err) throw err;
            // console.log('copied');
          });
        } else {
          fs.mkdir(path.join(pathDest, item), { recursive: true }, (err) => {
            if (err) {
              return err;
            }
          });
          copyFolder(path.join(pathToFile, item), path.join(pathDest, item));
        }
      });
    });
  });
};