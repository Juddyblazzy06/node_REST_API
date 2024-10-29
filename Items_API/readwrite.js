// requiring modules
const fs = require('fs')


// function to read file
function reading(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject('Error reading the file')
      } else {
        resolve(data)
      }
    })
  })
};


// function to write to file and make changes
function writing(path, data) {
     return new Promise ((resolve, reject) => {
          fs.writeFile(path, data, 'utf-8', (err) => {
            if (err) {
              reject('Error writing the file')
            } else {
              resolve('File written successfully')
            }
          })
     })
};

// exporting the modules
module.exports = {
  reading,
  writing
   
}
