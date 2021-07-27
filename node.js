const http = require("http");
const fs = require("fs");
const page_data = fs.readFileSync("index.html");


const server = http.createServer((req,res)=>{
  if(req.url=="/"){
      res.write(page_data);
      res.end();
  }
});





// server.listen(3000);
console.log("Server is running");