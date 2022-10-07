const express = require('express');
const colors = require("colors")
const dotenv = require('dotenv').config();
const {errorHandler} = require("./middleware/errormiddleware")


const port = process.env.PORT || 5000

//app initialization 
const app = express()

//database connection


//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//API
app.use("/api/playlist",require("./routes/playlist"))
app.use(errorHandler)


app.listen(port , ()=>console.log(`Listening on ${port}`.bgBlue))