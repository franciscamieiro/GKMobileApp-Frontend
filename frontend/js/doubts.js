let writtenQuestion = document.getElementById("writtenQuestion");

const wrapperWritten = document.createElement('div');

wrapperWritten.className = "wrapperWritten";

wrapperWritten.innerHTML = '<span class="title">Escrever dúvida</span><input id="input" type="text" placeholder="Escreve a tua dúvida..."></input><div id="btnDeleteT" onclick="deleteText();">Apagar</div><div id="btnSendT" onclick="sendText();">Enviar</div>';

const id = localStorage.userloggedin;

window.onload = function() {
  let reloaded = localStorage.getItem("reloaded");
  if(reloaded == "sim"){
    swal({
      content: wrapperAudio,
      buttons: false
    });
  }
  localStorage.removeItem("reloaded")
}

function goBack() {
  window.history.back();
}

writtenQuestion.addEventListener("click", function(){
  swal({
    content: wrapperWritten,
    buttons: false
  });
});

function deleteText() {
  let input = document.getElementById("input");
  input.value = "";
  input.focus();
}

function sendText() {
  let input = document.getElementById("input");
  if(input.value == ""){
    swal({
      icon: 'images/warning.png',
            title: 'Atenção',
            text: 'Escreve a tua dúvida!',
            button: 'OK',
            className: "swalAlert"
    }).then(function(isConfirm) {

      input.focus();
      swal({
        content: wrapperWritten,
        buttons: false
      });
    });

  }else{

    // api/doubts/DoubtTxt
    let data = {};
    data.userID = id; //buscar o id do user q está logged in
    data.description = input.value;

    fetch("http://localhost:80/api/doubts/DoubtTxt", {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data)
    }).then(function(response) {
        console.log(data);
        if (!response.ok) {
            console.log(response.status); //=> number 100–599
            console.log(response.statusText); //=> String
            console.log(response.headers); //=> Headers
            console.log(response.url); //=> String
            if (response.status === 409) {
            }
            else {
                throw Error(response.statusText);
            }
        }
        else {
          swal({
            icon: 'images/v254_5.png',
            title: 'Sucesso',
            text: 'Dúvida Enviada!',
            buttons: false,
            className: "swalAlertSucess"
            
          }).then(function(isConfirm) {
          
            input.value = "";
          });
        }
    }).then(function(result) {
        console.log(result);
    }).catch(function(err) {
        swal({
            icon: 'images/v237_21.png',
            title: 'Erro',
            text: 'Erro ao enviar.',
            button: 'OK',
            className: "swalAlert"
            
        })
        console.error(err);
    });
      
    }
}

let logout = document.getElementById("logout");

logout.addEventListener("click", function(){
    
    swal({
        icon: 'images/v254_5.png',
        title: 'Sucesso',
        text: 'Sessão terminada',
        button: 'OK',
        className: "swalAlert"
    }).then((isConfirm) => {
        localStorage.clear();
        window.location.replace("login.html");
    });
});