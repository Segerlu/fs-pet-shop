import fs from "fs"
import path from "path"
import http from "http"
let port = process.env.PORT || 8000;
let server = http.createServer((req, res) => {

    let petUrl = req.url.split('/');

    if (req.method === "GET") {

        if (req.url === "/pets") {
            fs.readFile('pets.json', 'utf-8', (error, data) => {
                if (error) {
                    console.log('Unable to read file', error)
                    res.statusCode = 500
                    res.setHeader("Content-Type", "text/plain")
                    res.end("Internal Server Error")
                    process.exit(1)
                }
                res.setHeader("Content-Type", "application/json")
                res.end(data)
            })
        } else if (petUrl.length > 2) {
            fs.readFile('pets.json', 'utf-8', (error, data) => {
                if (error) {
                    console.log('Unable to read file', error)
                    res.statusCode = 500
                    res.setHeader("Content-Type", "text/plain")
                    res.end("Internal Server Error")
                    process.exit(1)
                }
                let pet = Number(petUrl[2])
                let dataArray = JSON.parse(data)
                if (pet < dataArray.length && pet >= 0) {

                    res.setHeader("Content-Type", "application/json") //or application/json??
                    data = JSON.stringify(dataArray[pet])
                    res.end(data)
                } else {
                    res.statusCode = 404
                    res.setHeader("Content-Type", "text/plain")
                    res.end("Content not found")
                }
            })
        } else {
            res.statusCode = 404
            res.setHeader("Content-Type", "text/plain")
            res.end("Content not found")
        }
    } else {
        res.statusCode = 404
        res.setHeader("Content-Type", "text/plain")
        res.end("Content not found")
    }
})
server.listen(port, () => console.log("Listening on port", port));