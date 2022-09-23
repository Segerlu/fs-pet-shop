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
            res.status(500);
            res.type("html");
            res.end("Internal Server Error");
        }
        res.type('json');
        res.end(data);
    })
})

app.get('/pets/:id', (req, res) => {
    fs.readFile('pets.json', 'utf-8', (error, data) => {
        if (error) {
            console.log('Unable to read file', error);
            res.status(500);
            res.type("html");
            res.end("Internal Server Error");
        }
        let dataAr = JSON.parse(data);
        
        let arUrl = req.params.id;

        if (arUrl < dataAr.length && arUrl >= 0) {
            res.status(200);
            res.type('json');
            res.end(JSON.stringify(dataAr[arUrl]));
        } else {
            res.type("html");
            res.status(404);
            res.end("Pet not found");
        }

    })
}) 

app.post('/pets', (req, res) => {
    let newPet = req.body;

    if (Object.keys(newPet).length === 3 && newPet.age && newPet.kind && newPet.name && typeof newPet.age === "number") {

        fs.readFile('pets.json', 'utf-8', (error, data) => {
            if (error) {
                console.log('Unable to read file', error);
                res.status(500);
                res.type("html");
                res.end("Internal Server Error");
            }
            res.type('json');
            data = JSON.parse(data);
            data.push(newPet);
            data = JSON.stringify(data);

            fs.writeFile('./pets.json', data, function (error) {
                if (error) {
                    console.log(error)
                }
                console.log('it worked');
            })

            res.end(data);
        })
    } else {
                console.log('Invalid Pet');
                res.status(500);
                res.type("html");
                res.end("Invalid pet");
    }
})

app.listen(port, () => {
    console.log("listening on port:", port);
});