import express from "express"
import bodyParser from "body-parser"
import viewEngine from "./config/viewEngine"
import initWebRoutes from "./route/web"
require('dotenv').config();
import connectDB from "./config/connectDB"
import cors from 'cors';

let app = express();
// app.use(cors({ credentials: true, origin: true }));
//Add headers
app.use(function (req, res, next) {

    //website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000");

    //request method you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    //Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-with,content-type');

    //Set to true if you need the website to include cookies in the request sent
    //to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)

    //Pass the next layer of middleware
    next();
})

//config app 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app)
initWebRoutes(app)

connectDB()

let port = process.env.PORT || 6969;
//port === undefine => port = 6969

app.listen(port, () => {
    //callback
    console.log("Backend Nodejs is running on the port: " + port)
}) 