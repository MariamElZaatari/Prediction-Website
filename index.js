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
    }).catch((error)=>{
        alert("Could not connect to API");
    });

    await fetch(`https://api.agify.io/?name=${name}`)
    .then(response => response.json())
    .then(data => {
        age.innerText=data.age;
    }).catch((error)=>{
        alert("Could not connect to API");
    });
    
}