let state= false;
const btnchangePass = document.getElementById("changePass");
let newInput = document.getElementById("inputPass");
let newInput1 = document.getElementById("inputPass1")

//function reveal password
function toggle(){

    if(state){
        newInput.setAttribute("type", "password");
        state= false;
    }
    else{
        newInput.setAttribute("type", "text");
        state= true;
    }
};

//function reveal password
function toggle1(){

    if(state){
        newInput1.setAttribute("type", "password");
        state= false;
    }
    else{
        newInput1.setAttribute("type", "text");
        state= true;
    }
};

btnchangePass.addEventListener("click", function(){
    
    if(newInput.value == ""){

        swal({
            icon: 'images/warning.png',
            title: 'Atenção',
            text: 'Escreve a pass antiga!',
            button: 'OK',
            className: "swalAlert"
            
        }).then(function(isConfirm) {
            newInput.focus();
        });

    }

    else if(newInput1.value == ""){

        swal({
            icon: 'images/warning.png',
            title: 'Atenção',
            text: 'Escreve a pass nova!',
            button: 'OK',
            className: "swalAlert"
            
        }).then(function(isConfirm) {
            newInput1.focus();
        });

    }

    else if(newInput.value != newInput1.value){

        swal({
            icon: 'images/v237_21.png',
            title: 'Erro',
            text: 'As palavras-passes não são iguais!',
            button: 'OK',
            className: "swalAlert"
            
        }).then(function(isConfirm) {
            newInput1.focus();
        });

    }

    
})