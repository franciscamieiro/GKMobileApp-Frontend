function goBack() {
  window.history.back();
}



let audioQuestion = document.getElementById("audioQuestion");
const wrapper = document.createElement('div');
wrapper.innerHTML = '<span class="title">Gravar dúvida por voz</span><div class="audio" id="audio"></div><div id="Progress_Status"><div id="myprogressBar"></div></div><div id="btnRecord">Gravar</div><div id="btnStop">Parar</div>';

audioQuestion.addEventListener("click", function(){
  swal({
    content: wrapper,
    buttons: false
  });

});

function record() {
  var element = document.getElementById("myprogressBar");   
  var width = 1;
  var identity = setInterval(scene, 60000);
  function scene() {
    if (width >= 100) {
      clearInterval(identity);
    } else {
      width++; 
      element.style.width = width + '%';
    }
  }

  var device = navigator.mediaDevices.getUserMedia({audio: true});
  var items = [];
  device.then(stream => {
    var recorder = new MediaRecorder(stream);
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





