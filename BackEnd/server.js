const express = require('express')  
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')

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


app.listen(8080, () => {
    MongoClient.connect('mongodb+srv://Albert:I6XAA3jYJoYymyZH@quiz.ayhem9e.mongodb.net/test?authSource=Quiz&authMechanism=SCRAM-SHA-1', {useNewUrlParser: true}, (err, result) => {
        if(err) throw err
        database = result.db('Quiz')
        console.log("connected")
    })
})