
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

let createAccount = document.getElementById("createAccount");

createAccount.addEventListener("click", function() {

    window.location.replace("regist.html");

});


function validateEmail(email) {
    
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());

}


//function login user
let btnLogin = document.getElementById("LogIn");

btnLogin.addEventListener("click", function() {

    let email = document.getElementById("inputEmail").value;
    let password = document.getElementById("inputPassword").value;

    let alert = document.getElementById("alert");

    let alertEmail = document.getElementById("alertEmail");
    let alertPass = document.getElementById("alertPass");
    let alertEmailNC = document.getElementById("alertEmailNC");
    let alertPassNR = document.getElementById("alertPassNR");

    if(email == ""){
        alertEmailNC.style.display = "block";
        alert.style.display = "block";
    }

    else if(password == ""){
        alertPass.style.display = "block";
        alert.style.display = "block";
    }

    /* FAZER CODIGO PARA O EMAIL QND O EMAIL NAO ESTÁ REGISTADO */
    else if(validateEmail(email) == false){
        alertEmail.style.display = "block";
        alert.style.display = "block";
    }

    /* CODIGO PARA A PASS ERRADA
    else if(validateEmail(email) == false){
        alertEmail.style.display = "block";
        alert.style.display = "block";
    } */

    else{
        
        //codigo de fazer login na base de dados
        window.location.replace("inicialPage.html");
    }

});

let btnOkAlert = document.getElementById("okAlert");

btnOkAlert.addEventListener("click", function() {

    let alert = document.getElementById("alert");

    let alertEmail = document.getElementById("alertEmail");
    let alertPass = document.getElementById("alertPass");
    let alertEmailNC = document.getElementById("alertEmailNC");
    let alertPassNR = document.getElementById("alertPassNR");


    if(alertEmail.style.display == "block"){
        alertEmail.style.display = "none";
        alert.style.display = "none";
    }

    else if(alertEmailNC.style.display == "block"){
        alertEmailNC.style.display = "none";
        alert.style.display = "none";
    }

    else if(alertPass.style.display == "block"){
        alertPass.style.display = "none";
        alert.style.display = "none";
    }

    else if (alertPassNR.style.display == "block"){
        alertPass.style.display = "none";
        alert.style.display = "none";
    }

});