const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

var db, collection;

const url = "mongodb+srv://wadiyamk:inventory123@cluster0.lgfjvtu.mongodb.net/?retryWrites=true&w=majority";
const dbName = "demo";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('reports').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {reports: result})
  })
})

app.post('/report', (req, res) => {
  db.collection('reports').insertOne({child:req.body.child, behavior:req.body.behavior, rating:req.body.rating}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/inventory', (req, res) => {
  db.collection('messages')
  .findOneAndUpdate({name: req.body.items},
    {
      $set: {
        name: req.body.items,
        msg: req.body.quantity,
    },
  }, {
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.put('/edit', (req, res) => {
  db.collection('reports')
  .findOneAndUpdate({_id:ObjectId(req.body._id)}, {
    $set: {
    behavior:req.body.newText
    }
    
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/reports', (req, res) => {
  console.log('working')
  db.collection('reports').deleteMany({}), (err, result) => {
    if (err) return res.send(500, err)
    res.send('Item deleted!')
  }
})
