function isConnected(){
    var ifConnected = window.navigator.onLine;

    if (ifConnected == false) {
        localStorage.lastWindow = "camera.html";
        window.location.replace("no_connection.html");
    }

}

setInterval(isConnected, 5000);

'use strict';

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const snap = document.getElementById("snap");
const btndownload = document.getElementById("download");
const draw = document.getElementById("draw");

video.width = window.innerWidth;
video.height = window.innerHeight;

const constraints = {
    audio: false,
    video:{
        width: video.width, 
        heigh: video.height
    }
};

async function init() {
    try{
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleSuccess(stream);
    }catch(e){
        window.history.back();
    }
}


function handleSuccess(stream){
    window.stream = stream;
    video.srcObject = stream;
}

init();

var context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

snap.addEventListener("click", function(){
    video.style.display = "none";
    canvas.style.display = "block";
    context.drawImage(video, 0, 0, video.width, video.height);
    snap.style.display = "none";
    btndownload.style.display = "block";
    draw.style.display = "block";
});

btndownload.addEventListener("click", function download(){
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = "image.png";
    link.click();
});

draw.addEventListener("click", function download(){

    localStorage.setItem("takenpicture", canvas.toDataURL());
    location.href = "canvas.html";
});

