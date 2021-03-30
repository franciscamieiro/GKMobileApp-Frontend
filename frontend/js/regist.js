let state= false;

//function reveal password
function toggle(){

    if(state){
        document.getElementById("inputPassword").setAttribute("type", "password");
        state= false;
    }
    else{
        document.getElementById("inputPassword").setAttribute("type", "text");
        state= true;
    }
};

let goToLogin = document.getElementById("goToLogin");

goToLogin.addEventListener("click", function() {

    window.location.replace("login.html");

});


//determine age through birth
function getAge(dateString) {

    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}

function validateEmail(email) {
    
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());

}


//function regist user
let btnSubmit = document.getElementById("btnRegistar");

btnSubmit.addEventListener("click", function() {

    let name = document.getElementById("inputName").value;
    let email = document.getElementById("inputEmail").value;
    let birth = document.getElementById("inputBirth").value;
    let password = document.getElementById("inputPassword").value;

    let age = getAge(birth);

    let alert = document.getElementById("alert");

    let alertAge = document.getElementById("alertAge");
    let alertAgeNC = document.getElementById("alertAgeNC");
    let alertName = document.getElementById("alertName");
    let alertEmail = document.getElementById("alertEmail");
    let alertPass = document.getElementById("alertPass");
    let alertEmailNC = document.getElementById("alertEmailNC");
    let alertRegistD = document.getElementById("alertRegistD");

    if(name == ""){
        alertName.style.display = "block";
        alert.style.display = "block";
    }

    else if(email == ""){
        alertEmailNC.style.display = "block";
        alert.style.display = "block";
    }

    else if(birth == ""){
        alertAgeNC.style.display = "block";
        alert.style.display = "block";
    }

    else if(password == ""){
        alertPass.style.display = "block";
        alert.style.display = "block";
    }

    else if(age < 4 || age > 18){
        alertAge.style.display = "block";
        alert.style.display = "block";
    }

    else if(validateEmail(email) == false){
        alertEmail.style.display = "block";
        alert.style.display = "block";
    }

    else{
        
        //codigo de pôr users na base de dados e criar login
        alertRegistD.style.display = "block";

    }

});

let btnOkAlert = document.getElementById("okAlert");

btnOkAlert.addEventListener("click", function() {

    let alert = document.getElementById("alert");

    let alertAge = document.getElementById("alertAge");
    let alertAgeNC = document.getElementById("alertAgeNC");
    let alertName = document.getElementById("alertName");
    let alertEmail = document.getElementById("alertEmail");
    let alertPass = document.getElementById("alertPass");
    let alertEmailNC = document.getElementById("alertEmailNC");

    if(alertName.style.display == "block"){
        alertName.style.display = "none";
        alert.style.display = "none";
    }

    else if(alertEmail.style.display == "block"){
        alertEmail.style.display = "none";
        alert.style.display = "none";
    }

    else if(alertEmailNC.style.display == "block"){
        alertEmailNC.style.display = "none";
        alert.style.display = "none";
    }

    else if(alertAge.style.display == "block"){
        alertAge.style.display = "none";
        alert.style.display = "none";
    }

    else if(alertAgeNC.style.display == "block"){
        alertAgeNC.style.display = "none";
        alert.style.display = "none";
    }

    else if(alertPass.style.display == "block"){
        alertPass.style.display = "none";
        alert.style.display = "none";
    }

});

let btnOkRegist = document.getElementById("okRegist");

btnOkRegist.addEventListener("click", function() {

    let alertRegistD = document.getElementById("alertRegistD");

    window.location.replace("registDone.html");
    

});
