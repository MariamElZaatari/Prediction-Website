var gender=document.getElementById("gender");
var age=document.getElementById("age");
var nationality=document.getElementById("nationality");

function prediction(event){
    event.preventDefault();
    var name=document.getElementById("name").value; 
    fetch(`https://api.genderize.io?name=${name}`)
    .then(response => response.json())
    .then(data => {
        if (data.gender=="female"){
            gender.innerHTML='<i class="fas fa-female"></i>';
        } else{
            gender.innerHTML='<i class="fas fa-male"></i>';
        }
    });
}