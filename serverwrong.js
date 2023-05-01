const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

// var db, collection;

const url = "mongodb+srv://wadiyamk:inventory123@cluster0.lgfjvtu.mongodb.net/?retryWrites=true&w=majority"

MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
res.render(view, locals)

.then(client => {
  const db = client.db('demo')
  const quotesCollection = db.collection('messages')

  app.set('view engine', 'ejs')

  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())
  app.use(express.static('public'))

  app.get('/', (req, res) => {
    db.collection('messages').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('index.ejs', {messages: result})
    })
  })

  app.put('/messages', (req, res) => {
    quotesCollection
    db.collection('messages')
    .findOneAndUpdate(
      {items: req.body.items},
      {
        $set: {
        items: req.body.items,
        quantity: req.body.quantity,
      },
    }, 
    {
      upsert: true,
    }
    )
  .then(result => {
    res.redirect(303, '/')
  })
  .catch(err => console.error(err))
  console.log(req.body)
})

  app.post('/messages', (req, res) => {
    if(req.body.items && req.body.quantity)
    {quotesCollection.insertOne(req.body).then(result => {
      console.log(result)
      res.redirect('/')

    })
  } else{res.sendStatus(400)}
  })

app.listen(3000, function () {
    const dbName = "inventory";
    db = client.db(dbName);
    console.log("Connected to `" + dbName + "`!");
    });
})

  app.delete('/messages', (req, res) => {
    quotesCollection.deleteOne({items: req.body.items})
    .then(result => {
    console.log(result)
    res.json('items')
    })
  })
})