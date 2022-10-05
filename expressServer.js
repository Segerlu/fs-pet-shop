import express from "express"
import pkg from 'pg';
const { Client } = pkg;
import con from './config.json' assert { type: 'json' }
const config = con[process.env.NODE_ENV || 'dev'];
const connectionString = config.connectionString;
let secretCode = con['passcode'].password;

const client = new Client({
    connectionString: connectionString,
});
client.connect();

let app = express();
app.use(express.json());

const port = 8005;

app.get('/', (req, res) => {
    res.post("Welcome to my petshop!");
})

app.get('/pets/:passcode', (req, res) => {

    let passcode = req.params.passcode;

    if (passcode === secretCode) {
        client.query('SELECT * FROM pets;')
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

app.post('/pets/:passcode/', (req, res) => {
    let newPet = req.body;
    console.log(newPet)
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
            console.log('Invalid Pet');
            res.status(500);
            res.type("html");
            res.end("Invalid pet");
        }
    } else {


        res.status(401);
        res.send("YOU ARE NOT AUTHORIZED TO SEE THIS PET!")
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

app.listen(port, () => {
    console.log("listening on port:", port);
});