const video = document.getElementById('video')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('./face/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('./face/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('./face/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('./face/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('./face/models')
])


async function faz() {
  const labeledFaceDescriptors = await loadLabeledImages();
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);

  const canvas = faceapi.createCanvasFromMedia(video);

  var largura = document.getElementById("video").offsetWidth;
  var altura = document.getElementById("video").offsetHeight;
  
  video.style.width = largura + "px";
  video.style.height = altura + "px";

  const displaySize = { width: largura, height: altura }

  faceapi.matchDimensions(video, displaySize)
  canvas.style.zIndex = "3";
  var tentativa = 0;
  var pessoa = "";
  var logar = "";

  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions().withFaceDescriptors()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

    const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))

    if (typeof results[0] !== 'undefined') {
      var resultado1 = results[0]._label.split(" ");

      if (tentativa == 0) {
        pessoa = resultado1;
        logar = resultado1;
        tentativa++;
      } else {
        pessoa = resultado1;
        if (logar[0] == pessoa[0]) {
          if (tentativa == 20) {
            if (logar != "unknown") {
              //alert("Logar o " + resultado1[0]);
              entrar(resultado1[0], resultado1[1])
              return;
            } else {
              tentativa = 0;
              swal(
                'Cara não reconhecida!',
                '',
                'warning'
              ).then(() => {
                tentativa = 0;
                endVideo();
              })

            }
          } else {
            tentativa++;
          }
        } else {
          tentativa = 0;
        }
      }
    } else {
      tentativa = 0;
    }

    results.forEach((result, i) => {
      const bottomRight = {
        x: resizedDetections[0].detection.box.bottomRight.x - 50,
        y: resizedDetections[0].detection.box.bottomRight.y,
      }
      var resultado = result._label.split(" ");
      new faceapi.draw.DrawTextField([`${resultado[0]}`], bottomRight).draw(canvas);

    })
  }, 100)
}


async function loadLabeledImages() {

  const labels = [];

  const response = await fetch('http://localhost:80/api/facial-recognition-images', {
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    method: 'GET',
  });
  var users = await response.json();

  for (var user of users) {
    labels.push(user)
  }

  return Promise.all(

    labels.map(async label => {

      const descriptions = [];

      const user = "data:image/png;base64," + label.picByte;
      const img = await faceapi.fetchImage(`${user}`)

      const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()

      if (typeof detections !== 'undefined') {
        descriptions.push(detections.descriptor)
      }
      return new faceapi.LabeledFaceDescriptors(label.user.username + " " + label.secret, descriptions)
    })
  )
}


//-------------------------------------------------------------------START VIDEO------------------------------------------------------

const btn = document.getElementById("btnVideo");

function startVideo() {
  video.style.display = "block";

  btn.style.display = "block";

  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
  setTimeout(faz, 1000)
  //faz();
}



//-------------------------------------------------------------------END VIDEO------------------------------------------------------

function endVideo() {

  const stream = video.srcObject;
  const tracks = stream.getTracks();
  const canvas = document.getElementsByTagName("CANVAS")[0];

  tracks.forEach(function (track) {
    track.stop();
  });

  video.srcObject = null;

  video.style.display = "none";
  if (typeof canvas !== 'undefined') {
    canvas.remove();
  }
  btn.style.display = "none";
}


//-------------------------------------------------------------------LOGN FUNCTION------------------------------------------------------

async function entrar(username, secret) {
  var data = {};

  data.username = username;

  fetch('http://localhost:80/api/auth/byEmail/' + username)
    .then((response) => response.json())
    .then((userid) => {

      localStorage.setItem("userloggedin", userid);
      fetch("http://localhost:80/api/users/" + userid)
        .then((response) => response.json())
        .then((user) => {

          let theme = user.theme;

          if (theme == "light") {

            localStorage.setItem('theme', 'light');

          } else if (theme == "dark") {

            localStorage.setItem('theme', 'dark');

          }

          window.location.replace("inicialPage.html");

        });
    });


};