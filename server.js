const path = require("path");
const jsonServer = require("json-server");

//instead of: const server = jsonServer.create()
const express = require("express");
const server = express();

//blocking middlewares calling from backend when fetching 
const middlewares = jsonServer.defaults();

//applying route of mock data 
const router = jsonServer.router(path.join(__dirname, "./src/users.json"));

//instead of: const middlewares = jsonServer.defaults()
const cors = require("cors");
const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

const validateInputData = (req, res, next) => {
    const data = req.body;
    res.send();
}

//instead of: server.use(middlewares)
//mount corse options
server.use(cors(corsOptions));


server.get("/users", (req, res, next) => {
    
});


server.use(router); 
server.listen(3010, () => {
    console.log("JSON Server is running");
});