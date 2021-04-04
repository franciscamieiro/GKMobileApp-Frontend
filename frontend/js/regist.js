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

    let name = document.getElementById("inputName");
    let email = document.getElementById("inputEmail");
    let birth = document.getElementById("inputBirth");
    let password = document.getElementById("inputPassword");

    let age = getAge(birth);

    if(name.value == ""){

        swal({
            icon: 'images/warning.png',
            title: 'Atenção',
            text: 'Preenche o teu Nome!',
            button: 'OK',
            className: "swalAlert"
            
        }).then(function(isConfirm) {
            name.focus();
        });

    }

    else if(birth.value == ""){

        swal({
            icon: 'images/warning.png',
            title: 'Atenção',
            text: 'Preenche a data de nascimento!',
            button: 'OK',
            className: "swalAlert"
            
        }).then(function(isConfirm) {
            birth.focus();
        });

    }

    else if(email.value == ""){

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

    else if(age < 4 || age > 18){

        swal({
            icon: 'images/warning.png',
            title: 'Atenção',
            text: 'Tens que ter entre 4 e 18 anos!',
            button: 'OK',
            className: "swalAlert"
            
        }).then(function(isConfirm) {
            birth.focus();
        });

    }

    else if(validateEmail(email.value) == false){

        swal({
            icon: 'images/v237_21.png',
            title: 'Atenção',
            text: 'O email não é válido.',
            button: 'OK',
            className: "swalAlert"
            
        }).then(function(isConfirm) {
            email.focus();
        });

    }

    else{
        
        
        swal({
            icon: 'images/v254_5.png',
            title: 'Sucesso',
            text: 'Registo feito com sucesso.',
            button: 'OK',
            className: "swalAlert"
            
        }).then(function(isConfirm) {
            window.location.replace("registDone.html");
        });

        //codigo de pôr users na base de dados e criar login

    }

});
