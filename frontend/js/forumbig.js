const wrapperAudio = document.createElement('div');

const wrapperWritten = document.createElement('div');

const wrapperFile = document.createElement('div');

wrapperWritten.className = "wrapperWritten";

wrapperFile.className = "wrapperFile";

wrapperAudio.innerHTML = '<span class="titleaudio">Gravar comentário</span><div class="audio" id="audio"></div><div id="Progress_Status"><div id="myprogressBar"></div></div><div id="btnRecord" onclick="record();">Gravar</div><div id="btnStop" onclick="stopRecording();">Parar</div><div id="btnDelete" onclick="deleteAudio();">Apagar</div><div id="btnSend" onclick="sendAudio();">Publicar</div>';

wrapperWritten.innerHTML = '<span class="title">Escrever comentário</span><input id="input" type="text" placeholder="Escreve o teu comentário..."></input><div id="btnDeleteT" onclick="deleteText();">Apagar</div><div id="btnPubliT" onclick="publishText();">Publicar</div>';

wrapperFile.innerHTML = '<span class="titleF">Escolher uma imagem ou vídeo</span><label id="inputLabel" class="v377_35">Escolher ficheiro<input class="inputfile" id="inputfile" type="file" accept="image/x-png,image/gif,image/jpeg,video/mp4,video/x-m4v,video/*"></input></label><div id="btnPubliF" onclick="publishFile();">Publicar</div>';

window.onload = function() {
    let reloaded = localStorage.getItem("reloaded");

    if (reloaded == "sim") {
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

let recorded = false;

function record() {

    recorded = true;

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

    var device = navigator.mediaDevices.getUserMedia({ audio: true });
    var items = [];
    device.then(stream => {
        var recorder = new MediaRecorder(stream);
        mainRecorder = recorder;

        recorder.ondataavailable = e => {
            items.push(e.data);
            if (recorder.state == 'inactive') {
                var blob = new Blob(items, { type: 'audio/webm' });
                var audio = document.getElementById("audio");
                var mainaudio = document.createElement("audio");
                mainaudio.setAttribute('controls', 'controls');
                audio.appendChild(mainaudio);
                mainaudio.innerHTML = '<source src="' + URL.createObjectURL(blob) + '" type="video/webm"/>';
            }
        }

        recorder.start();
        setTimeout(() => {
            recorder.stop();
        }, 60000);
    });

}

function stopRecording() {
    if (recorded) {
        stop();
    }
}

function stop() {
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
        text: 'Áudio publicado!',
        buttons: false,
        className: "swalAlertSucess"

    }).then(function(isConfirm) {
        window.location.reload();
    });

}

function coment() {

    swal({
        text: "Escolhe um",
        buttons: {
            cancel: {
                text: "Escrever um comentário",
                value: "coment",
                visible: true,
                className: "orange",
                closeModal: true
            },
            confirm: {
                text: "Escolher ficheiro",
                value: "chooseFile",
                visible: true,
                className: "blue",
                closeModal: true
            },
            hello: {
                text: "Gravar aúdio",
                value: "recordAudio",
                visible: true,
                className: "green",
                closeModal: true
            },

        },
    }).then((value) => {
        switch (value) {

            case "coment":
                swal({
                    content: wrapperWritten,
                    buttons: false
                });
                break;

            case "recordAudio":
                swal({
                    content: wrapperAudio,
                    buttons: false
                });
                break;

            case "chooseFile":
                swal({
                    content: wrapperFile,
                    buttons: false
                });
                break;
        }
    });

};

function deleteText() {
    let input = document.getElementById("input");
    input.value = "";
    input.focus();
}

function publishText() {

    let input = document.getElementById("input");

    if (input.value == "") {
        swal({
            icon: 'images/warning.png',
            title: 'Atenção',
            text: 'Escreve o comentário primeiro!',
            button: false,
            className: "swalAlert1"
        }).then(function(isConfirm) {

            input.focus();

            swal({
                content: wrapperWritten,
                buttons: false
            });
        });

    } else {
        swal({
            icon: 'images/v254_5.png',
            title: 'Sucesso',
            text: 'Comentário Publicado!',
            buttons: false,
            className: "swalAlert1"

        }).then(function(isConfirm) {

            input.value = "";

        });
    }
}

function reportpub() {

    swal({
        text: "Reportar Publicação",
        buttons: {
            confirm: {
                text: "Reportar",
                value: "report",
                visible: true,
                className: "red",
                closeModal: true
            },
        },
    }).then((result) => {
        swal({
            icon: 'images/v254_5.png',
            title: 'Sucesso',
            text: 'Publicação reportada!',
            buttons: false,
            className: "swalAlertSucess"

        });
    });
};