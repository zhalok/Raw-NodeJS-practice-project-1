const http = require("http");
const url = require("url");
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

    const parsedUrl = url.parse(req.url, true);
    console.log(parsedUrl);
    console.log("headers");
    console.log(req.headers);

    res.end();
}

app.createServer();

