require('dotenv').config()

const Server = require("./models/server");

const server = new Server()

//Server start
server.listen()

