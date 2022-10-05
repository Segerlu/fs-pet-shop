import express from "express"
import pkg from 'pg';
const { Client } = pkg;
import con from './config.json' assert { type: 'json' }
import cors from 'cors';
const config = con[process.env.NODE_ENV || 'dev'];
const connectionString = config.connectionString;
let secretCode = con['passcode'].password;

//let petsTable = document.getElementById("petsTable")
const client = new Client({
    connectionString: connectionString,
});
client.connect();

let app = express();
app.use(express.json());
app.use(cors());

var corsOptions = {
    origin: 'file://wsl%24/Ubuntu/home/steve/.local/classRepositories/fs-pet-shop/addPetForm.html',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

const port = 8005;

app.get('/', (req, res) => {
    res.post("Welcome to my petshop!");
})

app.get('/pets/:passcode', (req, res) => {

    let passcode = req.params.passcode;

    if (passcode === secretCode) {
        client.query('SELECT * FROM pets ORDER BY pets_id;')
            .then(result => {
                
                res.send(result.rows);
            })
    } else {
        res.status(401);
        res.send("YOU ARE NOT AUTHORIZED TO SEE MY PETS!")
    }

    

})

app.get('/pets/:passcode/:id', (req, res) => {

    let id = Number(req.params.id);
    let passcode = req.params.passcode;

    if (passcode === secretCode) {

        if (Number(id)) {
            client.query(`SELECT * FROM pets WHERE pets_id = ${id};`)
                .then(result => {
                    if (result.rows.length > 0) {
                        res.send(result.rows);
                    } else {
                        res.status(404, res.send("Pet not found!"))
                    }

                })
        } else {
            res.status(500, console.log("Internal Server Error"))
            res.send("Internal Server Error")
        }
    } else {
        res.status(401);
        res.send("YOU ARE NOT AUTHORIZED TO SEE THIS PET!")
    }


})

app.get('/pets/:passcode/:age/:kind/:name/', (req, res) => {

    let age = req.params.age !== "0" ? `= ${req.params.age}` : '> 0';
    let kind = req.params.kind !== "0" ? ` AND pets_kind = '${req.params.kind}'` : '';
    let name = req.params.name !== "0" ? ` AND pets_name = '${req.params.name}'` : '';
    let passcode = req.params.passcode;
    
    if (passcode === secretCode) {
            client.query(`SELECT * FROM pets WHERE pets_age ${age}${kind}${name};`)
                .then(result => {
                    if (result.rows.length > 0) {
                        res.send(result.rows);
                    } else {
                        res.status(404, res.send({id:'NO PET', age: 0, kind: 'NO PET', name: 'NO PET'}))
                    }
                })
    } else {
        res.status(401);
        res.send("YOU ARE NOT AUTHORIZED TO SEE THIS PET!")
    }


})

app.post('/pets/:passcode/', (req, res) => {
    let newPet = req.body;

    let passcode = req.params.passcode;

    if (passcode === secretCode) {

        if (!newPet) {
            res.send(newPet)
            return;
        }
        if (Object.keys(newPet).length === 3 && newPet.age && newPet.kind && newPet.name && typeof newPet.age === "number") {
            client.query(`INSERT INTO pets (pets_age, pets_kind, pets_name) 
        VALUES ('${newPet.age}', '${newPet.kind}', '${newPet.name}');`)
            res.send("pet added")
        } else {
            res.status(500);
            res.type("html");
            res.end("Invalid pet");
        }
    } else {


        res.status(401);
        res.send("YOU ARE NOT AUTHORIZED TO ADD THIS PET!")
    }
})

app.get('/pets/delete/:passcode/:id/', (req, res) => {

    let passcode = req.params.passcode;
    let id = Number(req.params.id);

    if (passcode === secretCode) {
        client.query(`DELETE FROM pets WHERE pets_id = '${id}';`)
            .then(result => {
                res.send("pet deleted");
            })
    } else {
        res.send("YOU ARE NOT AUTHORIZED TO SEE MY PETS!")
    }

})

app.get('/pets/update/:passcode/:id/:column/:update/', (req, res) => {

    let passcode = req.params.passcode;
    let column = req.params.column;
    let update = req.params.update;
    let id = Number(req.params.id);

    if (passcode === secretCode) {
        client.query(`UPDATE pets SET ${column} = '${update}' WHERE pets_id = '${id}';`)
            .then(result => {
                res.send("pet updated");
            })
    } else {
        res.send("YOU ARE NOT AUTHORIZED TO UPDATE MY PETS!")
    }

})

app.listen(port, () => {
    console.log("listening on port:", port);
});




function createResultCard(data, parent) {
    //data = {id:val, age:val, kind:val, name:val}

    for (let i = 0; i < data.genres.length; i++) {
        genresAr.push(data.genres[i].name);
    }

    let resultsCard = document.createElement("span");
    resultsCard.classList.add("result-card");

    let petID = document.createElement("h1");
    petID.classList.add("id");
    petID.textContent = data.id;

    let petAge = document.createElement("h2");
    petAge.classList.add("age");
    petAge.textContent = data.age;

    let petkind = document.createElement("h2");
    petkind.classList.add("kind");
    petkind.textContent = data.kind;

    let petName = document.createElement("h2");
    petName.classList.add("name");
    petName.textContent = data.name;

    resultsCard.append(petID, petAge, petkind, petName);
    parent.appendChild(resultsCard);
}