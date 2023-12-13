const path = require("path");
const jsonServer = require("json-server");
const bodyParser = require("body-parser");

const express = require("express");
const server = express();

//blocking middlewares calling from backend when fetching 
const middlewares = jsonServer.defaults();

//applying route of mock data 
const router = jsonServer.router(path.join(__dirname, "./src/users.json"));

const cors = require("cors");
const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

server.use(bodyParser.json());
server.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);
server.use(cors(corsOptions));

const validateInputData = (req, res, next) => {
    const data = req.body;
    res.send();
};

server.use("/users", (req, res, next) => {
    console.log("request");
    next();
});
server.post("/users", (req, res, next) => {
    console.log(req.method);     
    console.log(req.body)
    
});


server.use(router); 
server.listen(3010, () => {
    console.log("JSON Server is running");
});