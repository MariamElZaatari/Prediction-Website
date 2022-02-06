var username = document.getElementById("name");
var gender = document.getElementById("gender");
var age = document.getElementById("age");
var nationality = document.getElementById("nationality");

//-------------- Get Random Dog Image --------------
window.onload = getDogImage();

function getDogImage() {
    var dog_image = document.createElement("img");
    //Fetch from API
    fetch(`https://dog.ceo/api/breeds/image/random`)
        .then(response => response.json())
        .then(data => {
            //Retrieve Image URL from API
            dog_image.src = data.message;
            document.getElementsByClassName("image")[0].append(dog_image);
        })
}
//--------------------------------------------------

//---------------- Predit Function -----------------
function prediction(event) {
    //Reset Nationality Div
    nationality.innerHTML = "";

    //Prevent Refresh on Enter
    event.preventDefault();

    //Start Predicting By Calling Different Functions
    var name = username.value;
    getGender(name);
    getAge(name);
    getNationalities(name);

    //Reset Username Input
    username.value = "";
}
//--------------------------------------------------

//--------------- Get Gender Function --------------
function getGender(name) {
    //Fetch From API
    fetch(`https://api.genderize.io?name=${name}`)
        .then(response => response.json())
        .then(data => {
            //Show Different Icon in Case Female or Male
            if (data.gender == "female") {
                gender.innerHTML = '<i class="fas fa-female female"></i>';
            } else {
                gender.innerHTML = '<i class="fas fa-male male"></i>';
            }
        }).catch(() => {
            alert("Could not connect to API");
        });
}
//--------------------------------------------------

//---------------- Get Age Function ----------------
function getAge(name) {
    //Fetch From API
    fetch(`https://api.agify.io/?name=${name}`)
        .then(response => response.json())
        .then(data => {
            //Retrieve Age and Assign it
            age.innerText = data.age;
        }).catch(() => {
            alert("Could not connect to API");
        });
}
//--------------------------------------------------

//------------- Get Nationality Section ------------
//Fetch Nationality From API function
function getNationalities(name) {
    fetch(`https://api.nationalize.io/?name=${name}`)
        .then(response => response.json())
        .then(async data => {
            //Fetch From API Country Array and Loop
            var countries = data.country;
            for (var i = 0; i < countries.length; i++) {
                //Create Country Card HTML by Retrieving Flag URL and Probability
                var flag_url = await getFlag(countries[i].country_id);
                createCountryCard(flag_url, countries[i].probability);
            }
        }).catch(() => {
            alert("Could not connect to API");
        });
}

//Fetch Flag From API Function
async function getFlag(country_id) {
    return await fetch(`https://countryflagsapi.com/png/${country_id}`).then(response => response.url);
}

//Create Country Card for HTML
function createCountryCard(flagURL, prob) {
    //Adjust Probability as Percentage
    var probability = Math.floor(prob * 100);
    //Create Card Div Containing Image and Percentage
    const card = document.createElement("div")
    card.classList.add("country");
    var elements = `<img class="flag" src=${flagURL} alt="TEST"><span class="prob">${probability}%</span>`
    card.innerHTML = elements;
    nationality.append(card);
}
//--------------------------------------------------