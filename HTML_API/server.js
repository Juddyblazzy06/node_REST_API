const path = require('path');
const http = require('http');
const { reading, readingBinary } = require('./readwrite');
const { requestHandler } = require('./controller');


const port = 5000;
const hostname = 'localhost';


const server = http.createServer(requestHandler);
server.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`)
});
