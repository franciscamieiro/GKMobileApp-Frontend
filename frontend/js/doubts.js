
let audioQuestion = document.getElementById("audioQuestion");
let writtenQuestion = document.getElementById("writtenQuestion");

const wrapperAudio = document.createElement('div');

const wrapperWritten = document.createElement('div');

wrapperWritten.className = "wrapperWritten";

wrapperAudio.innerHTML = '<span class="titleaudio">Gravar dúvida por voz</span><div class="audio" id="audio"></div><div id="Progress_Status"><div id="myprogressBar"></div></div><div id="btnRecord" onclick="record();">Gravar</div><div id="btnStop" onclick="stop();">Parar</div><div id="btnDelete" onclick="deleteAudio();">Apagar</div><div id="btnSend" onclick="sendAudio();">Enviar</div>';

wrapperWritten.innerHTML = '<span class="title">Escrever dúvida</span><input id="input" type="text" placeholder="Escreve a tua dúvida..."></input><div id="btnDeleteT" onclick="deleteText();">Apagar</div><div id="btnSendT" onclick="sendText();">Enviar</div>';


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


audioQuestion.addEventListener("click", function(){
  swal({
    content: wrapperAudio,
    buttons: false
  });
});

writtenQuestion.addEventListener("click", function(){
  swal({
    content: wrapperWritten,
    buttons: false
  });
});

let mainRecorder = null;
let interval = null;

function record() {

var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myprogressBar");
    var width = 1;
    var id = setInterval(frame, 900);
    interval = id;
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}
move();
  var device = navigator.mediaDevices.getUserMedia({audio: true});
  var items = [];
  device.then(stream => {
    var recorder = new MediaRecorder(stream);
    mainRecorder = recorder;
    recorder.ondataavailable = e=>{
      items.push(e.data);
      if(recorder.state == 'inactive'){
        var blob = new Blob(items, {type: 'audio/webm'});
        var audio = document.getElementById("audio");
        var mainaudio = document.createElement("audio");
        mainaudio.setAttribute('controls', 'controls');
        audio.appendChild(mainaudio);
        mainaudio.innerHTML = '<source src="'+ URL.createObjectURL(blob)+'" type="video/webm"/>';
      }
    }
    recorder.start();
    setTimeout(()=> {
      recorder.stop();
    }, 60000);
  })

}



function stop(){
  let btnRecord = document.getElementById("btnRecord");
  let btnStop = document.getElementById("btnStop");
  let btnDelete = document.getElementById("btnDelete");
  let btnSend = document.getElementById("btnSend");
  let Progress_Status = document.getElementById("Progress_Status");
  let myprogressBar = document.getElementById("myprogressBar");
  myprogressBar.style.display = "none";
  Progress_Status.style.display = "none";
  mainRecorder.stop();
  clearInterval(interval);
  btnRecord.style.display = "none";
  btnStop.style.display = "none";
  btnDelete.style.display = "inline-block";
  btnSend.style.display = "inline-block";
}


function deleteAudio() {
  window.location.reload();
  localStorage.setItem("reloaded", "sim");
}

function sendAudio() {
  swal({
    icon: 'images/v254_5.png',
    title: 'Sucesso',
    text: 'Dúvida Enviada!',
    buttons: false,
    className: "swalAlertSucess"
    
  }).then(function(isConfirm) {
    window.location.reload();
  });
  
}

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
}