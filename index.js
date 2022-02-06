var gender=document.getElementById("gender");
var age=document.getElementById("age");
var nationality=document.getElementById("nationality");

window.onload=getDogImage();
function getDogImage(){
    var dog_image=document.createElement("img");
    fetch(`https://dog.ceo/api/breeds/image/random`)
    .then(response => response.json())
    .then(data => {
        dog_image.src=data.message;
        document.getElementsByClassName("image")[0].append(dog_image);
    })
}

function prediction(event){
    
    event.preventDefault();
    var name=document.getElementById("name").value;
    
    getGender(name);
    getAge(name);
    getNationalities(name);
}

function getGender(name){
    fetch(`https://api.genderize.io?name=${name}`)
    .then(response => response.json())
    .then(data => {
        if (data.gender=="female"){
            gender.innerHTML='<i class="fas fa-female"></i>';
        } else{
            gender.innerHTML='<i class="fas fa-male"></i>';
        }
    }).catch(()=>{
        alert("Could not connect to API");
    });
}

function getAge(name){
    fetch(`https://api.agify.io/?name=${name}`)
    .then(response => response.json())
    .then(data => {
        age.innerText=data.age;
    }).catch(()=>{
        alert("Could not connect to API");
    });
}

function getNationalities(name){
    fetch(`https://api.nationalize.io/?name=${name}`)
    .then(response => response.json())
    .then(async data => {
        var countries=data.country;
        for (var i=0; i<countries.length;i++){
            var flag_url= await getFlag(countries[i].country_id);
            createCountryCard(flag_url,countries[i].probability);
        }
    }).catch(()=>{
        alert("Could not connect to API");
    });
}

async function getFlag(country_id){
    return await fetch(`https://countryflagsapi.com/png/${country_id}`).then(response => response.url);
}

function createCountryCard(flagURL, prob){
    var probability=Math.floor(prob*100);
    var elements=`<img class="flag" src=${flagURL} alt="TEST"><span>${probability}%</span>`
    const card=document.createElement("div")
    card.innerHTML=elements;
    nationality.append(card);
}