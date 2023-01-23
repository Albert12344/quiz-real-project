const express = require('express')  
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')
const dotenv = require('dotenv').config()

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


app.listen(process.env.PORT, () => {
    MongoClient.connect(process.env.MONGODB_URI, {useNewUrlParser: true}, (err, result) => {
        if(err) throw err
        database = result.db('Quiz')
        console.log("connected")
    })
})