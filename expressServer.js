import fs from "fs"
import express from "express"
import path from "path"
import http from "http"
let app = express();
app.use(express.json());
const port = 8005;

app.get('/pets', (req, res) => {
    fs.readFile('pets.json', 'utf-8', (error, data) => {
        if (error) {
            console.log('Unable to read file', error);
            res.statusCode = 500;
            res.type("html");
            res.end("Internal Server Error");
            process.exit(1);
        }
        res.type('json');
        res.end(data);
    })
})

app.get('/pets/*', (req, res) => {
    fs.readFile('pets.json', 'utf-8', (error, data) => {
        if (error) {
            console.log('Unable to read file', error);
            res.statusCode = 500;
            res.type("html");
            res.end("Internal Server Error");
            process.exit(1);
        }
        let dataAr = JSON.parse(data);
        
        let arUrl = req.url.split("/");
        if (arUrl[2] < dataAr.length && arUrl[2] >= 0) {
            res.status(200);
            res.type('json');
            res.end(JSON.stringify(dataAr[arUrl[2]]));
        } else {
            res.type("html");
            res.status(404);
            res.end("Pet not found");
        }

    })
}) 


app.listen(port, () => {
    console.log("listening on port:", port);
});


// let server = http.createServer((req, res) => {

//     let petUrl = req.url.split('/');

//     if (req.method === "GET") {

//         if (req.url === "/pets") {
//             fs.readFile('pets.json', 'utf-8', (error, data) => {
//                 if (error) {
//                     console.log('Unable to read file', error)
//                     res.statusCode = 500
//                     res.setHeader("Content-Type", "text/plain")
//                     res.end("Internal Server Error")
//                     process.exit(1)
//                 }
//                 res.setHeader("Content-Type", "application/json")
//                 res.end(data)
//             })
//         } else if (petUrl.length > 2) {
//             fs.readFile('pets.json', 'utf-8', (error, data) => {
//                 if (error) {
//                     console.log('Unable to read file', error)
//                     res.statusCode = 500
//                     res.setHeader("Content-Type", "text/plain")
//                     res.end("Internal Server Error")
//                     process.exit(1)
//                 }
//                 let pet = Number(petUrl[2])
//                 let dataArray = JSON.parse(data)
//                 if (pet < dataArray.length && pet >= 0) {

//                     res.setHeader("Content-Type", "application/json") //or application/json??
//                     data = JSON.stringify(dataArray[pet])
//                     res.end(data)
//                 } else {
//                     res.statusCode = 404
//                     res.setHeader("Content-Type", "text/plain")
//                     res.end("Content not found")
//                 }
//             })
//         } else {
//             res.statusCode = 404
//             res.setHeader("Content-Type", "text/plain")
//             res.end("Content not found")
//         }
//     } else {
//         res.statusCode = 404
//         res.setHeader("Content-Type", "text/plain")
//         res.end("Content not found")
//     }
// })
// server.listen(port, () => console.log("Listening on port", port));