const fs = require("fs");
const http = require("http");

const server = http.createServer();
//define a function which is the read from data and write to site
server.on("request", (req, res) => {
// fs.readFile("input.txt", "utf-8",(err, data) => {
//     if(err) return console.error(err);
//     res.end(data.toString());
//     })
//   const readableStream = fs.createReadStream("input.txt");
//   //create a variable which name is readableStream and it is equal to data for the input.txt
//   //chunk data gets data automatically and asynchronously
//   readableStream.on("data", (chunkdata) => {
//     res.write(chunkdata);
//   });
//   readableStream.on("end", () => {
//     res.end();
//   });
//   //this function give an error meessage for the wrong file name
//   readableStream.on("error", (err) => {
//     console.log(err);
//     res.end("File not found");
//   });
    //PERFORMING THE SAME STREAMING OF DATA BUT NOW WITH THE HELP OF PIPE()
    const readableStream = fs.createReadStream("input.txt");
    readableStream.pipe(res);
});
//starting a server with 8000port an ip address
server.listen(8000, "127.0.0.1");
