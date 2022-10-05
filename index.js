let petsTable = document.getElementById("petsTable")
let btn = document.getElementById('button');
let age = document.getElementById('age');
let kind = document.getElementById('kind');
let petname = document.getElementById('name');

let url = "http://localhost:8005/pets/StevenIsAwesome!";

populatePets();

btn.addEventListener("click", () => {

    //console.log(age.value, kind.value, petname.value)
    searchPets(age.value, kind.value, petname.value)
})

document.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Trigger the button element with a click
        searchPets(age.value, kind.value, petname.value)
    }
})

async function searchPets(pet_age, pet_kind, pet_name) {
    while (petsTable.firstChild) {
        petsTable.removeChild(petsTable.firstChild);
    }
    age.value = '';
    kind.value = '';
    petname.value = '';
    let search = url;

    pet_age = pet_age ? pet_age : "0";
    pet_kind = pet_kind ? pet_kind : "0";
    pet_name = pet_name ? pet_name : "0";

    let response = await fetch(`${url}/${pet_age}/${pet_kind}/${pet_name}`);
    let data = await response.json();

    if (data.length > 1) {
        data.map(pet => createResultCard(pet, petsTable));
    } else {
        createResultCard(data[0], petsTable);
    }
}

async function populatePets() {

    //data = [{id, age, kind, name},{id, age, kind, name},{id, age, kind, name}]

    let response = await fetch(url);
    let data = await response.json();

    data.map(pet => createResultCard(pet, petsTable));
}


function createResultCard(data, parent) {

    petImg = data.pets_kind == "dog" ? "./pics/dog.jpg" :
            data.pets_kind == "cat" ? "./pics/cat.jpg" :
            data.pets_kind == "rock" ? "./pics/rock.jpg" :
            data.pets_kind == "fly" ? "./pics/fly.jpg" :
            data.pets_kind == "ferret" ? "./pics/ferret.jpg" :
            data.pets_kind == "spider" ? "./pics/spider.jpg" : "./pics/noImage.jpg";

    let resultsCard = document.createElement("span");
    resultsCard.classList.add("result-card");

    let petID = document.createElement("h1");
    petID.classList.add("id");
    petID.textContent = `Pet ID: ${data.pets_id}`;

    let petAge = document.createElement("h2");
    petAge.classList.add("age");
    petAge.textContent = `Pet age: ${data.pets_age}`;

    let petkind = document.createElement("h2");
    petkind.classList.add("kind");
    petkind.textContent = `Pet kind: ${data.pets_kind}`;

    let petName = document.createElement("h2");
    petName.classList.add("name");
    petName.textContent = `Pet name: ${data.pets_name}`;

    let img = document.createElement("img");
    img.src = petImg;

    let petData = document.createElement("div");
    petData.classList.add("petData");

    let imgContainer = document.createElement("div");
    imgContainer.classList.add("imgContainer");


    imgContainer.append(img);
    petData.append(petID, petAge, petkind, petName);
    resultsCard.append(petData, imgContainer);
    parent.appendChild(resultsCard);
}