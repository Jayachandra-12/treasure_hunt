const express = require("express")
const app = express()
const usersApp = require('./APIs/users')
const path = require("path")
require('dotenv').config()

app.use(express.static(path.join(__dirname,'./build')))

const mclient = require('mongodb').MongoClient

//Database URL
const DBurl = process.env.DATABASE_CONNECTION_URL;

mclient.connect(DBurl)
    .then((client) => {
        let dbObj = client.db("treasurehunt")
        let usersCollection = dbObj.collection("users")
        let leaderboardCollection = dbObj.collection("leaderboard")
        let reviewsCollection = dbObj.collection("usersreview")
        app.set("usersCollection", usersCollection)
        app.set("leaderboardCollection", leaderboardCollection)
        app.set("reviewsCollection",reviewsCollection)
        console.log("db connection success")
    })
    .catch(err => console.log(err))

app.use(express.json())


app.use('/users', usersApp)


//dealing with page refresh
app.use('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'build/index.html'))
})


app.use((request, response, next) => {
    response.send({ message: "Invalid Path" })
})

app.use((error, request, response, next) => {
    response.send({ message: error.message })
})

const port = process.env.PORT
//assign port number
app.listen(port, () => console.log("Server started"))
