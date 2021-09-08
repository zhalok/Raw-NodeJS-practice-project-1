const server = require("./lib/server");
const worker = require("./lib/worker");
server.start();
worker.duty();