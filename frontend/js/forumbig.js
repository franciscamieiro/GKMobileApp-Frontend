const id = localStorage.userloggedin;

const wrapperAudio = document.createElement('div');

const wrapperWritten = document.createElement('div');

const wrapperFile = document.createElement('div');

wrapperWritten.className = "wrapperWritten";

wrapperFile.className = "wrapperFile";

wrapperAudio.innerHTML = '<span class="titleaudio">Gravar comentário</span><div class="audio" id="audio"></div><div id="Progress_Status"><div id="myprogressBar"></div></div><div id="btnRecord" onclick="record();">Gravar</div><div id="btnStop" onclick="stopRecording();">Parar</div><div id="btnDelete" onclick="deleteAudio();">Apagar</div><div id="btnSend" onclick="sendAudio();">Publicar</div>';

wrapperWritten.innerHTML = '<span class="title">Escrever comentário</span><input id="input" type="text" placeholder="Escreve o teu comentário..."></input><div id="btnDeleteT" onclick="deleteText();">Apagar</div><div id="btnPubliT" onclick="publishText();">Publicar</div>';

wrapperFile.innerHTML = '<span class="titleF">Escolher uma imagem ou vídeo</span><label id="inputLabel" class="v377_35">Escolher ficheiro<input class="inputfile" id="inputfile" type="file" accept="image/x-png,image/gif,image/jpeg,image/jpg,video/mp4,video/x-m4v,video/*"></input></label><div id="btnPubliF" onclick="publishFile();">Publicar</div>';

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
let audiosrc = null;

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
        items.length = 0;
        recorder.ondataavailable = e => {
            items.push(e.data);
            if (recorder.state == 'inactive') {
                var blob = new Blob(items, { type: 'audio/mp3' });
                var audio = document.getElementById("audio");
                var mainaudio = document.createElement("audio");
                mainaudio.setAttribute('controls', 'controls');
                audio.appendChild(mainaudio);
                mainaudio.innerHTML = '<source src="' + URL.createObjectURL(blob) + '" type="audio/mp3"/>';
                audiosrc = URL.createObjectURL(blob);
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

    let data = {};
    data.creationID = IDcreation;
    data.date = new Date();
    data.userID = id;
    data.description = null;
    data.audio = new Audio();
    data.audio.src = audiosrc;

    fetch("http://localhost:80/api/comments/audio", {
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
                text: 'Áudio publicado!',
                buttons: false,
                className: "swalAlertSucess"
        
            }).then(function(isConfirm) {
                window.location.reload();
            });
        }
    }).then(function(result) {
        console.log(result);
    }).catch(function(err) {
        swal({
            icon: 'images/v237_21.png',
            title: 'Erro',
            text: 'Erro ao publicar áudio.',
            button: 'OK',
            className: "swalAlert"
            
        });
        console.error(err);
    });


}

function coment() {

    swal({
        text: "Escolhe um",
        buttons: {
            text: {
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

    const forumComments = document.getElementById("comment");

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

            let data = {};
            data.creationID = IDcreation;
            data.date = new Date();
            data.userID = id; //buscar o id do user q está logged in
            data.description = input.value;

            fetch("http://localhost:80/api/comments/txt", {
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
                        text: 'Comentário Publicado!',
                        buttons: false,
                        className: "swalAlert1"
            
                    }).then(function(isConfirm) {
            
                        input.value = "";
                        
                        const renderComments = async() => {

                            let strHtml = ``;
                    
                            const creationID = localStorage.getItem("idClickedPub");
                            const response = await fetch(`http://localhost:80/api/comments/creations/` + creationID)
                            const comments = await response.json()
                            let i = 1;
                            console.log(comments);
                            for (const comment of comments) {
                    
                                strHtml += `
                                <li class="comment user-comment">
                    
                                <div class="info">
                                    <a href="#">${comment.userID.name}</a>
                                    <span>${comment.date}</span>
                                </div>
                    
                                <a class="avatar" href="#">
                                    <img src="images/avatar4.jpeg" width="35" alt="Profile Avatar" title=${comment.userID.name} />
                                </a>
                    
                                <p class="noscroll">${comment.description}</p>
                    
                                </li>
                                `;
                                i++
                            }
                            forumComments.innerHTML = strHtml;
                    
                        }

                        renderComments();
            
                    });
                }
            }).then(function(result) {
                console.log(result);
            }).catch(function(err) {
                swal({
                    icon: 'images/v237_21.png',
                    title: 'Erro',
                    text: 'Erro ao comentar.',
                    button: 'OK',
                    className: "swalAlert"
                    
                })
                console.error(err);
            });
    }
}

function publishFile(){
    var fileinput = document.getElementById('inputfile'); // input file
    
    var img = new Image();

    fileinput.onchange = function(evt) {
        var files = evt.target.files; // FileList object
        var file = files[0];
        if(file.type.match('image.*')) {
            var reader = new FileReader();
            // Read in the image file as a data URL.
            reader.readAsDataURL(file);
            reader.onload = function(evt){
                if( evt.target.readyState == FileReader.DONE) {
                    img.src = evt.target.result;
                    let data = {};

                    data.creationID = IDcreation;
                    data.date = new Date();
                    data.userID = id; 
                    data.description = null;
                    data.image = img;

                    fetch("http://localhost:80/api/comments/image", {
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
                                text: 'Imagem Comentada!',
                                buttons: false,
                                className: "swalAlert1"
                    
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
                            text: 'Erro ao comentar imagem.',
                            button: 'OK',
                            className: "swalAlert"
                            
                        })
                        console.error(err);
                    });
                }
            }   

        } else {
            
        }
    };
}

function reportpub() {

    swal({
        text: "Denunciar Publicação",
        buttons: {
            confirm: {
                text: "Denunciar",
                value: "report",
                visible: true,
                className: "red",
                closeModal: true
            },
        },
    }).then((value) => {
        if (value == "report") {

            // /api/complaints/complaint

            const creationID = localStorage.getItem("idClickedPub");
            var today = new Date();

            let data = {};
            data.userC = id;
            data.creationID = creationID; 
            data.date =  today;
            data.state = 0;
            data.type = null;

            fetch("http://localhost:80/api/complaints/complaint", {
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
                        swal({
                            icon: 'images/v237_21.png',
                            title: 'Erro',
                            text: 'Esse local favorito já está registado!',
                            button: 'OK',
                            className: "swalAlert"
                            
                        });
                    }
                    else {
                        throw Error(response.statusText);
                    }
                }
                else {
                    swal({
                        icon: 'images/v254_5.png',
                        title: 'Sucesso',
                        text: 'Publicação reportada!',
                        buttons: false,
                        className: "swalAlertSucess"
        
                    });
                }
            }).then(function(result) {
                console.log(result);
            }).catch(function(err) {
                swal({
                    icon: 'images/v237_21.png',
                    title: 'Erro',
                    text: 'Erro ao denunciar.',
                    button: 'OK',
                    className: "swalAlert"
                    
                })
                console.error(err);
            });
            
        }
    });
};

let userID = null;
let IDcreation = null;

window.onload = () => {

    const id = localStorage.userloggedin;
    
    const forumcreations = document.getElementById("forum");
    const forumComments = document.getElementById("comment");

    const renderCreations = async() => {

        let strHtml = ``;

        const creationID = localStorage.getItem("idClickedPub");
        const response = await fetch(`http://localhost:80/api/creations/` + creationID)
        const creation = await response.json()
        let i = 1;
        console.log(creation);
        strHtml += `
            <div class="card">
            <div class="card-header">
                <img src="./images/v549_186.png" class="img-fluid v549_186" alt="">
                <i class="mr-1"></i>${creation.city}
                <a class="mt-1 fa fa-bars fa-lg noscroll" style="float: right; color: black;" onclick="reportpub()"></a>
            </div>
            <img src="./images/v549_72.png" class="criacoesimg img-responsive" id="popupimg">
            <div class="card-footer">
                <img src="./images/avatar1.png" class="img-fluid smallkidimg">
                <i class="mr-1"></i> Autor: ${creation.user.name}
            </div>
        </div>
            `;
        forumcreations.innerHTML = strHtml;
        userID = creation.userID;
        IDcreation = creationID;
    }

    const renderComments = async() => {

        let strHtml = ``;

        const creationID = localStorage.getItem("idClickedPub");
        const response = await fetch(`http://localhost:80/api/comments/creations/` + creationID)
        const comments = await response.json()
        let i = 1;
        console.log(comments);
        for (const comment of comments) {
            if(comment.description !== null){
                strHtml += `
                <li class="comment user-comment">
    
                <div class="info">
                    <a href="#">${comment.userID.name}</a>
                    <span>${comment.date}</span>
                </div>
    
                <a class="avatar" href="#">
                    <img src="images/avatar4.jpeg" width="35" alt="Profile Avatar" title=${comment.userID.name} />
                </a>
    
                <p class="noscroll">${comment.description}</p>
    
                </li>
                `;
            }else if (comment.audio !== null){
              /*  strHtml += `
                <li class="comment user-comment">

                <div class="info">
                    <a href="#">${comment.userID.name}</a>
                    <span>${comment.date}</span>
                </div>

                <a class="avatar" href="#">
                    <img src="images/avatar4.jpeg" width="35" alt="Profile Avatar" title=${comment.userID.name} />
                </a>

                <p class="noscroll">${comment.description}</p>

                </li>
                `;*/
            }else if (comment.image !== null){
               /* strHtml += `
                <li class="comment user-comment">

                <div class="info">
                    <a href="#">${comment.userID.name}</a>
                    <span>${comment.date}</span>
                </div>

                <a class="avatar" href="#">
                    <img src="images/avatar4.jpeg" width="35" alt="Profile Avatar" title=${comment.userID.name} />
                </a>

                <p class="noscroll">${comment.description}</p>

                </li>
                `;*/
            }else if (comment.video !== null){
               /* strHtml += `
                <li class="comment user-comment">

                <div class="info">
                    <a href="#">${comment.userID.name}</a>
                    <span>${comment.date}</span>
                </div>

                <a class="avatar" href="#">
                    <img src="images/avatar4.jpeg" width="35" alt="Profile Avatar" title=${comment.userID.name} />
                </a>

                <p class="noscroll">${comment.description}</p>

                </li>
                `;*/
            }
            i++
        }
        forumComments.innerHTML = strHtml;

    }

    const renderEvaluation = async() => {

        let strHtml = ``;

        const creationID = localStorage.getItem("idClickedPub");
        const response = await fetch(`http://localhost:80/api/evaluation/` + creationID + `/users/` + id)
        const evaluation = await response.json()
        console.log(evaluation);
        //buscar a avaliação que o user logged in fez da pub q está a ver//se for null n fazer nada
    }

    renderCreations();
    renderComments();
   // renderEvaluation();
}

let star1 = document.getElementById("star1");
let star2 = document.getElementById("star2");
let star3 = document.getElementById("star3");
let star4 = document.getElementById("star4");
let star5 = document.getElementById("star5");

star1.addEventListener("click", function() {
    evaluate("star1");
})
star2.addEventListener("click", function() {
    evaluate("star2");
})
star3.addEventListener("click", function() {
    evaluate("star3");
})
star4.addEventListener("click", function() {
    evaluate("star4");
})
star5.addEventListener("click", function() {
    evaluate("star5");
})


function evaluate(star){
    let nstar = null;

    if(star == "star1"){
        nstar = parseInt(1);
    }
    else if(star == "star2"){
        nstar = parseInt(2);
    }
    else if(star == "star3"){
        nstar = parseInt(3);
    }
    else if(star == "star4"){
        nstar = parseInt(4);
    }
    else if(star == "star5"){
        nstar = parseInt(5);
    }

    // api/evaluation

    let data = {};
    data.creationID = IDcreation;
    data.evaluation = nstar;
    

    fetch("http://localhost:80/api/evaluation/", {
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
                text: 'Publicação avaliada!',
                buttons: false,
                className: "swalAlert1"

            })
        }
    }).then(function(result) {
        console.log(result);
    }).catch(function(err) {
        swal({
            icon: 'images/v237_21.png',
            title: 'Erro',
            text: 'Erro ao avaliar.',
            button: 'OK',
            className: "swalAlert"
            
        })
        console.error(err);
    });
}
