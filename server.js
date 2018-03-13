const smartApp = require("./smartapp");
const express = require("express");
const server = express();
const port = process.env.PORT || 3000;

/* Express server used for local testing only */
server.use(express.json());

/* Only here for Glitch, so that GET doesn't return an error */
server.get("/", (req, res) =>
{
    res.send("Air Quality Light");
});

/* Handles lifecycle events from SmartThings */
server.post("/", async (req, res) =>
{
    smartApp.handleHttpCallback(req, res);
});

server.post("/", (req, res, next) =>
{
    smartApp.handleHttpCallback(req, res);
});

server.listen(port, () =>
    console.log(`Server is up and running on port ${port}.`)
);