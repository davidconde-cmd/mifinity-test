const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/contacts.json');
const middlewares = jsonServer.defaults();
const db = require('./contacts.json');
const fs = require('fs');
const _ = require('lodash')

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
server.use(bodyParser.json())

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

server.get('/contacts/:id/addresses": "/addresses?contactId=:id',  (req, res) => {
  res.jsonp(req.query);
})

server.post('/contacts/:id/addresses', (req, res) => {

  if (Array.isArray(req.body)) {
    req.body.forEach(element => {
        insert(element);
    });
  }
  else {
      insert(req.body);
  }

  res.sendStatus(200);

  function insert(data) {

      const table = router.db.get('addresses');

      // Create a new doc if this ID does not exist
      if (_.isEmpty(table.find({id: data.id}).value())) {
          table.push(data).write();
      }
      else{
          // Update the existing data
          table.find({id: data.id})
          .assign(_.omit(data, ['id']))
          .write();
      }
  }

});


// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

// Use default router
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
