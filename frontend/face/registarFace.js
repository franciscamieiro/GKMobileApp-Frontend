const video = document.getElementById('video');
var valido = false;
const imageUpload = document.getElementById('novaCara');
var eValido = true;
var ola = "";


Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('./face/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('./face/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('./face/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('./face/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('./face/models')
])



video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  canvas.style.zIndex = "3";

  video.style.width = "" + document.getElementById("divVideo").offsetWidth + "px";
  video.style.height = "auto";

  var largura = document.getElementById("video").offsetWidth;
  var altura = document.getElementById("video").offsetHeight;

  const displaySize = { width: largura, height: altura }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

    if (typeof detections[0] !== 'undefined') {
      //console.log("valido");
      valido = true;
    } else {
      //console.log("invalido");
      valido = false;
    }

  }, 100)
})


//-------------------------------------------------------------------START VIDEO------------------------------------------------------

const btn = document.getElementById("btnVideo");
const divVideo = document.getElementById("divVideo");

function startVideo() {
  divVideo.style.display = "block";

  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}



//-------------------------------------------------------------------END VIDEO------------------------------------------------------

function endVideo() {

  const stream = video.srcObject;
  const tracks = stream.getTracks();
  const canvas = document.getElementsByTagName("CANVAS")[1];

  tracks.forEach(function (track) {
    track.stop();
  });

  video.srcObject = null;

  divVideo.style.display = "none";
  if (typeof canvas !== 'undefined') {
    canvas.remove();
  }
}


//------------------------------------------------------------------TAKE PHOTO-----------------------------------------------------------------

document.getElementById("btnTakePhoto").addEventListener("click", () => {

  if (valido) {

    var canvas, ctx;
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    var dataURI = canvas.toDataURL('image/jpeg');
    endVideo();
    document.getElementById("FtRecFac").src = dataURI;
    document.getElementById("input").style.display = "flex";
    document.getElementById("span").style.display = "block";
    document.getElementById("RegistarReconhecimento").style.display = "inline-block";
    document.getElementById("cancel").style.display = "inline-block";


    var blob = dataURLtoBlob(dataURI);
    ola = new FormData();
    ola.append("file", blob);

  } else {
    swal(
      'Esta foto não é válida!',
      '',
      'warning'
    )
  }


})

//-----------------------------------------------------------REGISTAR PHOTO----------------------------------------------------------------
const id = localStorage.userloggedin;

document.getElementById("RegistarReconhecimento").addEventListener("click", () => {

  var password = document.getElementById("Pass").value.trim();
  var ft = document.getElementById("FtRecFac").src;


  if (!(password == "" || ft == "")) {
    if (eValido) {

      console.log(ola);
      //facial-recognition/upload/{userID}

      fetch('http://localhost:80/api/facial-recognition/upload/' + id, {
        mode: 'cors',
        method: 'POST',
        body: ola,
        credentials: 'include'
      })
        .then(function (response) {
          //console.log(response.headers.get('Set-Cookie'));
          console.log(response);
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .catch(function (err) {
          //swal.showValidationError('Pedido falhado: ' + err);
          console.log(err); // estava alert(err); coloquei console log para não estar sempre a aparecer pop-up ao utilizador
        })
        .then(async function (result) {
          console.log(result);
          if (result) {

              let idfacial = result.objectId;

              let data = {};
              data.passwordInserted = password;

              ///api/facial-recognition/{id} 
              fetch('http://localhost:80/api/facial-recognition/' + idfacial, {
                headers: { 'Content-Type': 'application/json' },
                method: 'PUT',
                body: JSON.stringify(data)
              })
                .then(function (response) {
                  //console.log(response.headers.get('Set-Cookie'));
                  console.log(response);
                  if (!response.ok) {
                    throw new Error(response.statusText);
                  }
                  return response.json();
                })
                .catch(function (err) {
                  console.log(err); // estava alert(err); coloquei console log para não estar sempre a aparecer pop-up ao utilizador
                })
                .then(async function (result) {
                  console.log(result);
                  if (result) {

                    swal({
                      icon: 'images/v254_5.png',
                      title: 'Sucesso',
                      text: 'Reconhecimento facial registado com sucesso!',
                      className: "swalAlert",
                      button: 'Ok',
                    }).then((value) => {

                      document.getElementById("FtRecFac").src = "";
                      document.getElementById("input").style.display = "none";
                      document.getElementById("span").style.display = "none";
                      document.getElementById("RegistarReconhecimento").style.display = "none";
                      document.getElementById("cancel").style.display = "none"

                    });

                  } else {
                    swal({
                      icon: 'images/v237_21.png',
                      title: 'Erro',
                      text: 'Erro ao guardar.',
                      button: 'OK',
                      className: "swalAlert"

                    })

                  }
                });
            

          } else {
            swal({
              icon: 'images/v237_21.png',
              title: 'Erro',
              text: 'Erro ao guardar.',
              button: 'OK',
              className: "swalAlert"

            })

            //swal({ title: `${result.value.userMessage.message.pt}` });
          }
        });




    } else {
      swal(
        'Esta foto não é válida!',
        '',
        'warning'
      )
    }
  } else {
    swal(
      'Insere a palavra-passe',
      '',
      'warning'
    )
  }


})


//----------------------------------------------dataURLtoBlob---------------------------------------------
function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

let state = false;

function toggle() {

  if (state) {
      document.getElementById("Pass").setAttribute("type", "password");
      state = false;
  }
  else {
      document.getElementById("Pass").setAttribute("type", "text");
      state = true;
  }
};


document.getElementById("cancel").addEventListener("click", function(){
  document.getElementById("FtRecFac").src = "";
  document.getElementById("input").style.display = "none";
  document.getElementById("Pass").value = "";
  document.getElementById("span").style.display = "none";
  document.getElementById("RegistarReconhecimento").style.display = "none";
  document.getElementById("cancel").style.display = "none"
});