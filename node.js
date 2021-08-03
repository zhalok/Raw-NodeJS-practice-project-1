const http = require("http");
const app = {}
app.config = {
    port: 3000,
}

app.createServer = () => {
    const server = http.createServer(app.ReqResHandler);
    server.listen(app.config.port);
    console.log("server is on");
}

app.ReqResHandler = (req, res) => {
    res.write("Hello world");
    res.end();
}

app.createServer();