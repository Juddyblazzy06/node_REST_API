// const path = require('path')
const http = require('http')
// const { reading, readingBinary } = require('./readwrite')
const { getItems, getItem, createItem, updateItem, deleteItem } = require('./controller');
const path = require('path');

const port = 7000
const hostname = 'localhost'

const requestHandler = (req, res) => {
     const { url, method } = req;
     const id = Number(url.split('/')[2]);
     // getting all items route
     if (url === "/"||url.startsWith("/item") || url.startsWith("/items")){
       if (url === '/items' && method === 'GET') {
           console.log('getting all items')
         getItems(req, res)
       }
       // getting a single item route
       else if ((url.startsWith('/item') || url.startsWith('/items')) && method === 'GET') {
          console.log('getting an item')
         getItem(req, res, id)
       } 
       // adding a new item to the list route
       else if (url === '/items'&& method === 'POST') {
         console.log('creating item')
         createItem(req, res)
       } 
       // editing an item on the list route
       else if (url === '/items' && (method === 'PUT'|| method === 'PATCH')) {
         console.log('updating item')
         updateItem(req, res)
       } 
       // deleting an item from the list route
       else if (url.startsWith('/items') && method === 'DELETE') {
         console.log('deleting item')
         deleteItem(req, res, id)

       }
       // invalid route
       else {
         res.writeHead(404, { 'Content-Type': 'application/json' })
         res.end('Page not found or an invalid url')
       }
     }
     // no route
     else {
          res.writeHead(404, {"Content-Type":"application/json"})
          res.end("Page no found or an invalid url")
     }

//end of handler
};

const server = http.createServer(requestHandler)
server.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`)
});
