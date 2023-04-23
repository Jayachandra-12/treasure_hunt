const express = require('express')
const usersApp = express.Router()
const expressAsyncHandler = require('express-async-handler')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const mclient = require('mongodb').MongoClient
const DBurl = process.env.DATABASE_CONNECTION_URL;


usersApp.use(express.json())

async function getCollection(s) {
    const client = await mclient.connect(DBurl)
    let dbObj = client.db("treasurehunt")
    let collectionObj = dbObj.collection(s)
    return collectionObj
}

//GET ALL USERS
usersApp.get('/getusers', expressAsyncHandler(async (request, response) => {
    let usersCollection = await getCollection("users")

    let usersObj = await usersCollection.find().toArray()
    response.send({ message: "all users", payload: usersObj })
}))

//create user
usersApp.post('/createuser', expressAsyncHandler(async (request, response) => {
    let userObj = request.body
    let usersCollection = await getCollection("users")
    let userObjDb = await usersCollection.findOne({ username: userObj.username })
    if (userObjDb !== null) response.send({ message: "Username already exists" })
    else {
        let hashedPassword = await bcryptjs.hash(userObj.password, 5)
        userObj.password = hashedPassword
        await usersCollection.insertOne(userObj)
        response.send({ message: "User added succesfully" })
    }
}))


//login
usersApp.post('/login', expressAsyncHandler(async (request, response) => {
    let userObj = request.body
    let usersCollection = await getCollection("users")
    let userObjDb = await usersCollection.findOne({ username: userObj.username, account: userObj.account })

    if (userObjDb == null) response.send({ message: "Wrong user name" })
    else {
        let validUser = await bcryptjs.compare(userObj.password, userObjDb.password)
        if (validUser == false) {
            response.send({ message: "incorrect password" })
        }
        else {
            let token = jwt.sign({ username: userObjDb.username }, process.env.SECRET_KEY , { expiresIn: "1d" })
            response.send(token)
        }
    }
}))

//add attempts
usersApp.post('/attempt', expressAsyncHandler(async (request, response) => {
    let userObj = request.body
    let leaderboardCollection = await getCollection("leaderboard")
    let existed = await leaderboardCollection.findOne({ username: userObj.username })
    if (!existed) {
        await leaderboardCollection.insertOne(userObj)
        response.send({ message: "attempt created" })
    }
}))

//increasing attempt
usersApp.post('/increase', expressAsyncHandler(async (request, response)=> {
    let userObjUsername = request.body.username
    let leaderboardCollection = await getCollection("leaderboard")
    const update = { $inc : {attempt : 1}}
    await leaderboardCollection.updateOne({username : userObjUsername}, update)
    response.send({message : "attempt increased"})
}))

//update the values
usersApp.post('/updatearray', expressAsyncHandler(async (request, response) => {
    let userObjUsername = request.body.username
    let leaderboardCollection = await getCollection("leaderboard")
    let f1 = request.body.first
    let f2 = request.body.second
    let f3 = request.body.third
    let f4 = request.body.fourth
    let tot = request.body.total
    const update = { $set : {first : f1, second : f2, third : f3, fourth : f4, total : tot}}
    await leaderboardCollection.updateOne({username : userObjUsername}, update)
    response.send({message : "updated "})
}))

//get user leaderboard
usersApp.post('/getuserscore', expressAsyncHandler(async (request, response)=> {
    let leaderboardCollection = await getCollection("leaderboard")
    let un = request.body.username
    let res = await leaderboardCollection.findOne({username : un})
    response.send(res)
}))

//get all users
usersApp.get('/getallusersscore', expressAsyncHandler(async (request, response) => {
    let leaderboardCollection = await getCollection("leaderboard")

    let usersObj = await leaderboardCollection.find().toArray()
    response.send({ message: "all users", payload: usersObj })
}))

//posting users review
usersApp.post('/review', expressAsyncHandler(async (request, response) => {
    let userObj = request.body
    let reviewsCollection = await getCollection("usersreview")
    await reviewsCollection.insertOne(userObj)
    response.send({message : "review send"})
}))

//get user reviews
usersApp.get('/getreview', expressAsyncHandler(async (request, response)=> {
    let reviewsCollection = await getCollection("usersreview")

    let usersObj = await reviewsCollection.find().toArray()
    response.send({ message: "all users", payload: usersObj })
}))


module.exports = usersApp;