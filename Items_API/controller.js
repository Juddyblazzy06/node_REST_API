const path = require('path')
const { reading, writing } = require('./readwrite')
const itemsPath = path.join(__dirname, 'items.json')

// getting all items from the list
async function getItems(req, res) {
     try{
          console.log('getting items')
          const data = await reading(itemsPath)
          const file = JSON.parse(data)
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(file))
     }
     catch(err){
          res.writeHead(500, { 'Content-Type': 'application/json' })
          res.end('Error reading the file')
     }
     
};

// getting a single item from the list
async function getItem(req, res, id) {
     try{
          const data = await reading(itemsPath)
          const file = JSON.parse(data)
          const items = file.items
          const item = items.find(item => item.id === id)
          if (item) {
               res.writeHead(200, { 'Content-Type': 'application/json' })
               res.end(JSON.stringify(item))
          } else {
               res.writeHead(404, { 'Content-Type': 'application/json' })
               res.end('Item not found with the given id')
          }
     }
     catch(err){
          res.writeHead(500, { 'Content-Type': 'application/json' })
          res.end('Error reading the file')
     }
}

//posting a new item to the list
async function createItem (req, res) {
     try{
          let body = [];
          req.on("data", (chunk) =>{
               body.push(chunk);
          })
          req.on("end", async () => {
               body = Buffer.concat(body).toString();
               const newItem = JSON.parse(body); //parse the body of the request to JSON
               const data = await reading(itemsPath);
               const file = JSON.parse(data);
               const items = file.items;
               const newId = items.length + 1;
               newItem.id = newId;
               items.push(newItem);
               file.items = items;
               const updatedData = JSON.stringify(file);
                await writing(itemsPath, updatedData);
               res.writeHead(201, { 'Content-Type': 'application/json' });
               res.end(JSON.stringify(file));
          });
     }
     catch(err){
          res.writeHead(500, { 'Content-Type': 'application/json' })
          res.end('Error reading the file')
}
};


// updating an item on the list
async function updateItem (req, res) {
     try{
          let body = [];
          req.on("data", (chunk) =>{
               body.push(chunk);
          })
          req.on("end", async () => {
               body = Buffer.concat(body).toString();
               const newItem = JSON.parse(body); //parse the body of the request to JSON
               const newItemId = newItem.id;
               const data = await reading(itemsPath);
               const file = JSON.parse(data);
               const items = file.items;
               const itemIndex = items.findIndex((item)=>{return item.id === newItemId})
               console.log(itemIndex)
               if (itemIndex === -1){
                    res.writeHead(404, { "Content-Type": "text/plain" });
                    res.end("You are trying to update an item that does not exist");
                    return;
               }
               // items[itemIndex] = { ...items[itemIndex], ...newItem }
               items.splice(itemIndex, 1, newItem);
               file.items = items;
               const updatedData = JSON.stringify(file);
                await writing(itemsPath, updatedData);
               res.writeHead(200, { 'Content-Type': 'application/json' });
               res.end(JSON.stringify(file));
          });
     }
     catch(err){
          res.writeHead(500, { 'Content-Type': 'application/json' })
          res.end('Error reading the file')
}
};


// deleting an item from the list
async function deleteItem(req, res, urlId) {
  try {
    let body = []

    req.on('data', (chunk) => {
      body.push(chunk)
    })

    req.on('end', async () => {
      body = Buffer.concat(body).toString()
      let id

      // Parse body only if it's not empty
      if (body) {
        try {
          const newItem = JSON.parse(body)
          id = newItem?.id || urlId
        } catch (parseError) {
          res.writeHead(400, { 'Content-Type': 'text/plain' })
          res.end('Invalid JSON format in request body')
          return
        }
      } else {
        id = urlId
      }

      const data = await reading(itemsPath)
      const file = JSON.parse(data)
      const items = file.items

      // Find item by ID
      const itemIndex = items.findIndex((item) => item.id === id)
      if (itemIndex === -1) {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('You are trying to delete an item that does not exist')
        return
      }

      // Remove item and update file
      items.splice(itemIndex, 1)
      file.items = items
      const updatedData = JSON.stringify(file)
      await writing(itemsPath, updatedData)

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(file))
    })
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end('Error deleting the item')
  }
};


// exporting the functions
module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem
}
