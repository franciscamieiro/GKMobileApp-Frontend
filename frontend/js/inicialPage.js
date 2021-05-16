let logout = document.getElementById("logout");
let info = document.getElementById("info");
let box = document.getElementById("box");
let box1 = document.getElementById("box1");
let helptxt = document.getElementById("helptxt");
let close = document.getElementById("close");
let isShowing = false;
let orange = document.getElementById("orange");
let yellow = document.getElementById("yellow");
let purple = document.getElementById("purple");
let blue = document.getElementById("blue");

var viewportOffset = yellow.getBoundingClientRect();
// these are relative to the viewport, i.e. the window
var top = viewportOffset.top;
var left = viewportOffset.left;

box.style.display = "none";
box1.style.marginTop = top + 20 + "px";
box1.style.marginLeft = left - 140 + "px";
helptxt.style.height = "18%";
if (top >= 202) {
    helptxt.style.height = "14%";
    helptxt.style.marginTop = "220px";
}

logout.addEventListener("click", function () {

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

info.addEventListener("click", function () {

    if (isShowing == false) {
        box.style.display = "block";
        helptxt.style.display = "block";
        isShowing = true;
    }

});

function playSound(soundfile_ogg, soundfile_mp, soundfile_ma) {
    if ("Audio" in window) {
        var a = new Audio();
        if (!!(a.canPlayType && a.canPlayType('audio/ogg; codecs="vorbis"')
                .replace(/no/, '')))
            a.src = soundfile_ogg;
        else if (!!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/,
                '')))
            a.src = soundfile_mp;
        else if (!!(a.canPlayType && a.canPlayType(
                'audio/mp4; codecs="mp4a.40.2"').replace(/no/, '')))
            a.src = soundfile_ma;
        else
            a.src = soundfile_mp;

        a.autoplay = true;
        return;
    }
}

function start(){
    var viewportOffset = yellow.getBoundingClientRect();
    // these are relative to the viewport, i.e. the window
    var top = viewportOffset.top;
    var left = viewportOffset.left;

    audioObj = new Audio("../frontend/audio/audio1.mp3");

    

    box.style.display = "none";
    box1.style.marginTop = top + 20 + "px";
    box1.style.marginLeft = left - 140 + "px";
    helptxt.style.height = "18%";
    if (top >= 202) {
        helptxt.style.marginTop = "190px";
        helptxt.style.height = "22%"
    }
    box1.style.display = "block";
    helptxt.innerHTML = `Clica no icon amarelo para ver o forúm com publicações de criações, comentar e avaliar!<div class="close" onclick="close2()">Próxima</div>`

};

function close2() {
    var viewportOffset = purple.getBoundingClientRect();
    // these are relative to the viewport, i.e. the window
    var top = viewportOffset.top;
    var left = viewportOffset.left;

    box1.style.display = "none";
    box.style.marginTop = top + "px";
    box.style.marginLeft = left+70 + "px";
    helptxt.style.height = "18%";
    if (top >= 202) {
        helptxt.style.marginTop = "190px";
        helptxt.style.height = "22%"
    }
    box.style.display = "block";
    helptxt.innerHTML = `Clica no icon roxo para desenhar novos desenhos e ver desenhos que guardaste!<div class="close" onclick="close3()">Próxima</div>`

};

function close3() {
    var viewportOffset = blue.getBoundingClientRect();
    // these are relative to the viewport, i.e. the window
    var top = viewportOffset.top;
    var left = viewportOffset.left;

    box.style.display = "none";
    box1.style.marginTop = top+20 + "px";
    box1.style.marginLeft = left-145 + "px";
    helptxt.style.height = "18%";
    if (top >= 202) {
        helptxt.style.marginTop = "190px";
        helptxt.style.height = "22%"
    }
    box1.style.display = "block";
    helptxt.innerHTML = `Clica no icon azul para ver o mapa da tua cidade, marcar locais favoritos e tirar fotos!<div class="close" onclick="close4()">Fechar</div>`

}

function close4() {
    box.style.display = "none";
    box1.style.display = "none";
    helptxt.style.display = "none";
    helptxt.innerHTML = `Clica no icon laranja para veres um caminho de um sítio para o outro!<div class="close" onclick="start()">Próxima</div>`;
    box1.style.marginTop = "220px";
    box.style.marginTop = "190px";
    helptxt.style.marginTop = "345px";

    isShowing = false;
}