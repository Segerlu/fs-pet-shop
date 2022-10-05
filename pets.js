let fs = require("fs") 
import { argv } from "node:process";
let crud = '';
if (process.argv.length > 2) {

     crud = process.argv[2].toLowerCase();
} else {
    console.log("no command");
    proccess.exit(1);
}
let original = [];

fs.readFile("pets.json", "utf-8", function (error, data) {
    if (error) {
        console.log(error)
        process.exit(0);
    }
    data = (JSON.parse(data))
    original = [...data]
    // console.log(original);
    // console.log(process.argv);
    if (crud == "read") {
        read(process.argv[3], data);

    } else if (crud == "create") {
        create(original, process.argv)


    } else if (crud == "update") {
        update(data, process.argv)
    }

    // console.log(JSON.parse(data));
})

function create(data, args) {
    if (args.length < 6){
        console.log('all 3 arguments required!');
        process.exit(1);
    } 
    let obj = {
        age: Number(args[3]),
        kind: args[4],
        name: args[5]
    }
    data.push(obj)
    let newData = JSON.stringify(data);
    fs.writeFile('./pets.json', newData, function (error) {
        if (error) {
            console.log(error)
            process.exit(0);
        }
        console.log('it worked');
    })
}

function read(command, data) {
    if (command){
        if (command < data.length) {
            console.log(data[command]);
        } else {
            console.log("index out of bounds")
            process.exit(1);
        }
    } else {
        console.log(data);
    }

}

function update(data, newInfo) {
    let index = Number(newInfo[3]);
    let age = Number(newInfo[4]);
    let kind = newInfo[5];
    let name = newInfo[6];
    console.log('information changed');
data[index].age = age;
data[index].kind = kind;
data[index].name = name;
let newData = JSON.stringify(data);
fs.writeFile('./pets.json', newData, function (error) {
    console.log('writing to file');
    if (error) {
        console.log(error)
        process.exit(0);
    }
    console.log('it worked');
})
}