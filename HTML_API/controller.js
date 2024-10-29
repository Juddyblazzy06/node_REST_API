const path = require('path');  
const { reading, readingBinary } = require('./readwrite');


async function requestHandler(req, res) {
     // destructuring the url and method from the request object
  const { url, method } = req;
  // reading the index.html file
  if (url === '/' || (url === '/index.html' && method === 'GET')) {
    const htmlPath = path.join(__dirname, 'index.html'); //joining the path of the index.html file
    try {
      const data = await reading(htmlPath); //reading the index.html file
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(error)
    };
    //loading the image file
  } else if (url === '/HTML_API/images/jude.png') {
    const imgPath = path.join(__dirname, 'images', 'jude.png'); //joining the path of the image file
    try {
      const data = await readingBinary(imgPath); //reading the image file
      res.writeHead(200, { 'Content-Type': 'image/png' });
      res.end(data);
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(error);
    };
    // loading the error page
  } else {
    const errorPath = path.join(__dirname, 'error.html') //joining the path of the error.html file
    try {
      const data = await reading(errorPath); //reading the error.html file
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(error);
    };
  };
};


module.exports = {
     requestHandler
};


