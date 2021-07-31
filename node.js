// const http = require("http");
// const fs = require("fs");
// const page_data = fs.readFileSync("index.html");


// //  const server = http.createServer((req,res)=>{
// //    if(req.url=="/")
// //    {

// //      res.write(page_data);
// //      res.end();

// //    }
// //    else if(req.url=="/welcome"&&req.method=="POST")
// //    {
// //      req.on("data",(chunk)=>{
// //        console.log(chunk.toString());
// //      })
// //      res.write("hello");
// //      console.log("hello")
// //      res.end();
// //    }
// // });





// // server.listen(3000);
// // console.log("Server is running");

// // const app = {}
// // app.val =2;
// // console.log(app);


const data = require("./data.json");
const person = {
    name: "kaifa tabassum",
    age: 23,

}

data.push(person);
console.log(typeof JSON.stringify(data));

const fs = require("fs");
fs.writeFileSync("data.json", JSON.stringify(data));



