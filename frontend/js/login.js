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

    let email = document.getElementById("inputEmail");
    let password = document.getElementById("inputPassword");

    if(email.value == ""){
        swal({
            icon: 'images/warning.png',
            title: 'Atenção',
            text: 'Preenche o teu Email!',
            button: 'OK',
            className: "swalAlert"
            
        }).then(function(isConfirm) {
            email.focus();
        });
    }

    else if(password.value == ""){
        swal({
            icon: 'images/warning.png',
            title: 'Atenção',
            text: 'Preenche a tua Palavra-Passe!',
            button: 'OK',
            className: "swalAlert"
            
        }).then(function(isConfirm) {
            password.focus();
        });
    }

    /* FAZER CODIGO PARA O EMAIL QND O EMAIL NAO ESTÁ REGISTADO */
    else if(validateEmail(email.value) == false){
        swal({
            icon: 'images/warning.png',
            title: 'Atenção',
            text: 'O email não é válido.',
            button: 'OK',
            className: "swalAlert"
            
        }).then(function(isConfirm) {
            email.focus();
        });
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