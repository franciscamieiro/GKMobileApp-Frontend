let state= false;
const inputemail = document.getElementById("inputEmail");
const changePass = document.getElementById("changePass");

changePass.addEventListener("click", function(){
    
    if(inputemail.value == ""){

        swal({
            icon: 'images/warning.png',
            title: 'Atenção',
            text: 'Escreve o teu email!',
            button: 'OK',
            className: "swalAlert"
            
        }).then(function(isConfirm) {
            inputemail.focus();
        });

    }

    else{

        //fetch que procura o email na bd, se não existir dizer que o email n está registado
        window.location.replace("login.html");

    }

    
})