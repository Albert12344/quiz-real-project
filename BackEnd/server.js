const express = require('express')  
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')
const dotenv = require('dotenv').config()
const ObjectID = require('mongodb').ObjectID

const app = express()
app.use(cors());

app.use(express.json())
let database

app.get('/', (req, resp) => {
    resp.send('Welcome')
})
app.get('/quiz',(req, resp) => {
    database.collection('quiz').find().toArray((err,result) => {
        if(err) throw err
        resp.send(result)
    })
})

app.get('/login',(req, resp) => {
    database.collection('login').find().toArray((err,result) => {
        if(err) throw err
        resp.send(result)
    })
})

app.post('/quiz', (req, resp) => {
    const quiz = req.body
    database.collection('quiz')
    .insertOne(quiz)
    .then(result => {
        resp.status(201).json(result)
    })
})

app.post('/login', (req, resp) => {
    const person = req.body
    database.collection('login')
    .insertOne(person)
    .then(result => {
        resp.status(201).json(result)
    })
})

app.delete('/quiz/:id', (req, res,) => {
    const deleteId = ObjectID(req.params.id);
    database.collection('quiz')
    .deleteOne({ _id: deleteId }, (err, result) => {
        if (err) throw err;
        res.send('deleted')
    })
})  

app.put('/quiz/:id', (req, res) => {
    const updateId = req.params.id;
    database.collection('quiz')
    .updateOne({ _id: ObjectID(updateId)},{$set: req.body}, (err, result) => {
        if (err) throw err;
        res.send('updated');
    });
});

app.listen(process.env.PORT, () => {
    MongoClient.connect(process.env.MONGODB_URI, {useNewUrlParser: true}, (err, result) => {
        if(err) throw err
        database = result.db('Quiz')
        console.log("connected")
    })
})