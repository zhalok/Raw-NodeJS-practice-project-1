const http = require("http");
const server = http.createServer((req,res)=>{
  if(req.url=="/"){
      console.log();
  }
});

console.log("path: ");
console.log(__dirname);




// server.listen(3000);
console.log("Server is running");