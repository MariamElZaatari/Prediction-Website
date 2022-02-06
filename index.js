var gender=document.getElementById("gender");
var age=document.getElementById("age");
var nationality=document.getElementById("nationality");

async function prediction(event){
    event.preventDefault();
    var name=document.getElementById("name").value; 
    await fetch(`https://api.genderize.io?name=${name}`)
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

    await fetch(`https://api.agify.io/?name=${name}`)
    .then(response => response.json())
    .then(data => {
        age.innerText=data.age;
    }).catch(()=>{
        alert("Could not connect to API");
    });

    await fetch(`https://api.nationalize.io/?name=${name}`)
    .then(response => response.json())
    .then(async data => {
        var countries=data.country;
        for (var i=0; i<countries.length;i++){
            probability=Math.floor(countries[i].probability*100);
            var country_flag=document.createElement("img");
            country_flag.classList.add("flag");
            country_flag.setAttribute("width", "100px");
            country_flag.setAttribute("height", "70px");
            await fetch(`https://countryflagsapi.com/png/${countries[i].country_id}`).then(response => {
                country_flag.src=response.url;
            })
            nationality.append(country_flag)
            nationality.append(probability)
            nationality.append(document.createElement("br"));
        }
    }).catch(()=>{
        alert("Could not connect to API");
    });

}