const fs = require('fs');


function reading(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, encoding = 'utf8', (err, data) => {
      if (err) {
        reject('Error reading the file')
      } else {
        resolve(data)
      };
    });
  });
};


function readingBinary(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject('Error reading the file')
      } else {
        resolve(data)
      };
    });
});
};

module.exports = {
     reading,
     readingBinary
};