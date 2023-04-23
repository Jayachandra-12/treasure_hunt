const express = require("express")
const app = express()
const usersApp = require('./APIs/users')
const path = require("path")
require('dotenv').config()

app.use(express.static(path.join(__dirname,'./build')))

app.use(express.json())


app.get("/test",(req,res)=>{
    res.send("<h1>Success!</h1>")
})
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
