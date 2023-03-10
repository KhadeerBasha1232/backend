const connectToMongo = require('./db')
const express = require('express')
const app = express()
const port = 5000
const cors = require("cors")
const {MongoClient} = require('mongodb')

app.use(express.json())
app.use(cors())


app.use('/api/auth',require('./routes/auth.js'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


connectToMongo()


//////////////////////////////////////////////////


const uri = "mongodb+srv://admin:admin@cluster0.lctuidz.mongodb.net/test";
const client = new MongoClient(uri);
const db = client.db("web");
const col = db.collection("buy");
app.post('/buy',(req,res) => {
    console.log(req.body);
    col.insertOne(req.body);
    res.send("Insert Successfull");
})

///////////////////////////////////////////////////////
/////////orders////////////////////////////

app.get('/orders/:email',async(req,res) => {
  const em = req.params.email
  const result= await col.find({email : em}).toArray()
  console.log(result);
  res.send(result);
})

/////////////////////////////////////////////////////////
//////contact////////////////
const col1 = db.collection("contact");
app.post('/contact',(req,res) => {
    console.log(req.body);
    col1.insertOne(req.body);
    res.send("Insert Successfull");
})

/////////////////////////////////////////////////////////
const fetch = client.db("fetch");
const buy = fetch.collection("buy");
app.get('/fetchBuy',async(req,res) => {
  const result= await buy.find().toArray()
  console.log(result);
  res.send(result);
})


//////////////////////////////////////////////////////////


const rent = fetch.collection("rent");
app.get('/fetchRent',async(req,res) => {
  const result= await rent.find().toArray()
  console.log(result);
  res.send(result);
})
