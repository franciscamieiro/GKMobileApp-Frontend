function isConnected(){
    var ifConnected = window.navigator.onLine;

    if (ifConnected == false) {
        localStorage.setItem("lastWindow", "forumbig.html")
        window.location.replace("no_connection.html");
    }

}

setInterval(isConnected, 5000);

const id = localStorage.userloggedin;

const wrapperWritten = document.createElement('div');

const wrapperFile = document.createElement('div');

wrapperWritten.className = "wrapperWritten";

wrapperFile.className = "wrapperFile";

wrapperWritten.innerHTML = '<span class="title">Escrever comentário</span><input id="input" type="text" placeholder="Escreve o teu comentário..."></input><div id="btnDeleteT" onclick="deleteText();">Apagar</div><div id="btnPubliT" onclick="publishText();">Publicar</div>';

wrapperFile.innerHTML = '<span class="titleF">Escolher uma imagem ou vídeo</span><label id="inputLabel" class="v377_35">Escolher ficheiro<input class="inputfile" id="inputfile" type="file" accept="image/x-png,image/gif,image/jpeg,image/jpg" onchange="getfileinput(event);"></input></label><div id="btnPubliF" onclick="publishFile();">Publicar</div>';


function goBack() {
    window.history.back();
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

        },
    }).then((value) => {
        switch (value) {

            case "coment":
                swal({
                    content: wrapperWritten,
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
        }).then(function (isConfirm) {

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

        fetch("http://localhost:80/api/comments", {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(data)
        }).then(function (response) {
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

                }).then(function (isConfirm) {

                    input.value = "";

                    const renderImageComments = async () => {

                        let strHtml = ``;

                        const creationID = localStorage.getItem("idClickedPub");
                        const response = await fetch(`http://localhost:80/api/image/comments/` + creationID)
                        const comments = await response.json()
                        let i = 1;
                        for (const comment of comments) {

                            let date = comment.published.split("T");

                            let hours = date[1].split(".");

                            let avatar = comment.userID.avatar;

                            let profilesrc = null;

                            if (avatar == 1) {
                                profilesrc = "images/default-user-image.png"
                            } else if (avatar == 2) {
                                profilesrc = "images/avatar1.png"
                            }
                            else if (avatar == 3) {
                                profilesrc = "images/avatar2.png"
                            }
                            else if (avatar == 4) {
                                profilesrc = "images/avatar3.png"
                            } else if (avatar == 5) {
                                profilesrc = "images/avatar4.png"
                            } else if (avatar == 6) {
                                profilesrc = "images/avatar5.png"
                            } else if (avatar == 7) {
                                profilesrc = "images/avatar6.png"
                            } else if (avatar == 8) {
                                profilesrc = "images/avatar7.png"
                            } else if (avatar == 9) {
                                profilesrc = "images/avatar8.png"
                            } else if (avatar == 10) {
                                profilesrc = "images/avatar9.png"
                            } else if (avatar == 11) {
                                profilesrc = "images/avatar10.png"
                            } else if (avatar == 12) {
                                profilesrc = "images/avatar11.png"
                            } else if (avatar == 13) {
                                profilesrc = "images/avatar12.png"
                            }

                            let img = document.createElement("img");

                            let src = img.src = "data:image/jpeg;base64," + comment.image;

                            strHtml += `
                                 <li class="comment user-comment">
                 
                                 <div class="info">
                                     <a href="#">${comment.userID.name}</a>
                                     <span>${date[0] + " " + hours[0]}</span>
                                 </div>
                 
                                 <a class="avatar" href="#">
                                     <img src="${profilesrc}" width="35" alt="Profile Avatar"/>
                                 </a>
                 
                                 <p class="noscroll"><img src="${src}" width="150"></img></p>
                 
                                 </li>
                                 `;


                            i++
                        }
                        forumComments.innerHTML += strHtml;

                    }

                    const renderTextComments = async () => {

                        let strHtml = ``;

                        const creationID = localStorage.getItem("idClickedPub");
                        const response = await fetch(`http://localhost:80/api/comments/creations/` + creationID)
                        const comments = await response.json()
                        let i = 1;
                        for (const comment of comments) {

                            let avatar = comment.userID.avatar;

                            let profilesrc = null;

                            if (avatar == 1) {
                                profilesrc = "images/default-user-image.png"
                            } else if (avatar == 2) {
                                profilesrc = "images/avatar1.png"
                            }
                            else if (avatar == 3) {
                                profilesrc = "images/avatar2.png"
                            }
                            else if (avatar == 4) {
                                profilesrc = "images/avatar3.png"
                            } else if (avatar == 5) {
                                profilesrc = "images/avatar4.png"
                            } else if (avatar == 6) {
                                profilesrc = "images/avatar5.png"
                            } else if (avatar == 7) {
                                profilesrc = "images/avatar6.png"
                            } else if (avatar == 8) {
                                profilesrc = "images/avatar7.png"
                            } else if (avatar == 9) {
                                profilesrc = "images/avatar8.png"
                            } else if (avatar == 10) {
                                profilesrc = "images/avatar9.png"
                            } else if (avatar == 11) {
                                profilesrc = "images/avatar10.png"
                            } else if (avatar == 12) {
                                profilesrc = "images/avatar11.png"
                            } else if (avatar == 13) {
                                profilesrc = "images/avatar12.png"
                            }

                            strHtml += `
                                <li class="comment user-comment">
                    
                                <div class="info">
                                    <a href="#">${comment.userID.name}</a>
                                    <span>${comment.date}</span>
                                </div>
                    
                                <a class="avatar" href="#">
                                <img src="${profilesrc}" width="35" alt="Profile Avatar"/>
                                </a>
                    
                                <p class="noscroll">${comment.description}</p>
                    
                                </li>
                                `;
                            i++
                        }
                        forumComments.innerHTML += strHtml;

                    }

                    renderImageComments();
                    renderTextComments();

                });
            }
        }).then(function (result) {
        }).catch(function (err) {
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


var file = null;

function getfileinput(evt) {
    var files = evt.target.files; // FileList object
    if (files[0] != null) {
        file = files[0];
        evt.target.value = "";
    } else {
        swal({
            icon: 'images/v237_21.png',
            title: 'Erro',
            text: 'Escolhe uma imagem!',
            button: 'OK',
            className: "swalAlert"
        })
    }
};

function publishFile() {

    var img = new Image();

    if (file.type.match('image.*')) {
        var reader = new FileReader();
        // Read in the image file as a data URL.
        reader.readAsDataURL(file);

        reader.onload = function (evt) {
            if (evt.target.readyState == FileReader.DONE) {

                img.src = evt.target.result;
                var blob = dataURLtoBlob(img.src);
                image = new FormData();
                image.append("file", blob);

                //api/image/comments/upload/{creationID}/{userID}
                fetch("http://localhost:80/api/image/comments/upload/" + IDcreation + "/" + id, {
                    mode: 'cors',
                    method: 'POST',
                    body: image,
                    credentials: 'include'
                }).then(function (response) {
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

                        }).then(function (isConfirm) {

                            const forumComments = document.getElementById("comment");

                            const renderImageComments = async () => {

                                let strHtml = ``;

                                const creationID = localStorage.getItem("idClickedPub");
                                const response = await fetch(`http://localhost:80/api/image/comments/` + creationID)
                                const comments = await response.json()
                                let i = 1;
                                for (const comment of comments) {

                                    let date = comment.published.split("T");

                                    let hours = date[1].split(".");

                                    let avatar = comment.userID.avatar;

                                    let profilesrc = null;

                                    if (avatar == 1) {
                                        profilesrc = "images/default-user-image.png"
                                    } else if (avatar == 2) {
                                        profilesrc = "images/avatar1.png"
                                    }
                                    else if (avatar == 3) {
                                        profilesrc = "images/avatar2.png"
                                    }
                                    else if (avatar == 4) {
                                        profilesrc = "images/avatar3.png"
                                    } else if (avatar == 5) {
                                        profilesrc = "images/avatar4.png"
                                    } else if (avatar == 6) {
                                        profilesrc = "images/avatar5.png"
                                    } else if (avatar == 7) {
                                        profilesrc = "images/avatar6.png"
                                    } else if (avatar == 8) {
                                        profilesrc = "images/avatar7.png"
                                    } else if (avatar == 9) {
                                        profilesrc = "images/avatar8.png"
                                    } else if (avatar == 10) {
                                        profilesrc = "images/avatar9.png"
                                    } else if (avatar == 11) {
                                        profilesrc = "images/avatar10.png"
                                    } else if (avatar == 12) {
                                        profilesrc = "images/avatar11.png"
                                    } else if (avatar == 13) {
                                        profilesrc = "images/avatar12.png"
                                    }

                                    let img = document.createElement("img");

                                    let src = img.src = "data:image/jpeg;base64," + comment.image;

                                    strHtml += `
                                         <li class="comment user-comment">
                         
                                         <div class="info">
                                             <a href="#">${comment.userID.name}</a>
                                             <span>${date[0] + " " + hours[0]}</span>
                                         </div>
                         
                                         <a class="avatar" href="#">
                                             <img src="${profilesrc}" width="35" alt="Profile Avatar"/>
                                         </a>
                         
                                         <p class="noscroll"><img src="${src}" width="150"></img></p>
                         
                                         </li>
                                         `;


                                    i++
                                }
                                forumComments.innerHTML += strHtml;

                            }

                            const renderTextComments = async () => {

                                let strHtml = ``;

                                const creationID = localStorage.getItem("idClickedPub");
                                const response = await fetch(`http://localhost:80/api/comments/creations/` + creationID)
                                const comments = await response.json()
                                let i = 1;
                                for (const comment of comments) {

                                    let avatar = comment.userID.avatar;

                                    let profilesrc = null;

                                    if (avatar == 1) {
                                        profilesrc = "images/default-user-image.png"
                                    } else if (avatar == 2) {
                                        profilesrc = "images/avatar1.png"
                                    }
                                    else if (avatar == 3) {
                                        profilesrc = "images/avatar2.png"
                                    }
                                    else if (avatar == 4) {
                                        profilesrc = "images/avatar3.png"
                                    } else if (avatar == 5) {
                                        profilesrc = "images/avatar4.png"
                                    } else if (avatar == 6) {
                                        profilesrc = "images/avatar5.png"
                                    } else if (avatar == 7) {
                                        profilesrc = "images/avatar6.png"
                                    } else if (avatar == 8) {
                                        profilesrc = "images/avatar7.png"
                                    } else if (avatar == 9) {
                                        profilesrc = "images/avatar8.png"
                                    } else if (avatar == 10) {
                                        profilesrc = "images/avatar9.png"
                                    } else if (avatar == 11) {
                                        profilesrc = "images/avatar10.png"
                                    } else if (avatar == 12) {
                                        profilesrc = "images/avatar11.png"
                                    } else if (avatar == 13) {
                                        profilesrc = "images/avatar12.png"
                                    }

                                    strHtml += `
                                        <li class="comment user-comment">
                            
                                        <div class="info">
                                            <a href="#">${comment.userID.name}</a>
                                            <span>${comment.date}</span>
                                        </div>
                            
                                        <a class="avatar" href="#">
                                        <img src="${profilesrc}" width="35" alt="Profile Avatar"/>
                                        </a>
                            
                                        <p class="noscroll">${comment.description}</p>
                            
                                        </li>
                                        `;
                                    i++
                                }
                                forumComments.innerHTML += strHtml;

                            }

                            renderImageComments();
                            renderTextComments();
                        });
                    }
                }).then(function (result) {
                }).catch(function (err) {
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
            data.date = today;
            data.state = 0;
            data.type = null;

            fetch("http://localhost:80/api/complaints/complaint", {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify(data)
            }).then(function (response) {
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
            }).then(function (result) {
            }).catch(function (err) {
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

    const renderCreations = async () => {

        let strHtml = ``;

        const creationID = localStorage.getItem("idClickedPub");
        const response = await fetch(`http://localhost:80/api/creations/` + creationID)
        const creation = await response.json()
        let i = 1;

        let img = document.createElement("img");

        let src = img.src = "data:image/jpeg;base64," + creation.image;

        let avatar = creation.user.avatar;

        let profilesrc = null;

        if (avatar == 1) {
            profilesrc = "images/default-user-image.png"
        } else if (avatar == 2) {
            profilesrc = "images/avatar1.png"
        }
        else if (avatar == 3) {
            profilesrc = "images/avatar2.png"
        }
        else if (avatar == 4) {
            profilesrc = "images/avatar3.png"
        } else if (avatar == 5) {
            profilesrc = "images/avatar4.png"
        } else if (avatar == 6) {
            profilesrc = "images/avatar5.png"
        } else if (avatar == 7) {
            profilesrc = "images/avatar6.png"
        } else if (avatar == 8) {
            profilesrc = "images/avatar7.png"
        } else if (avatar == 9) {
            profilesrc = "images/avatar8.png"
        } else if (avatar == 10) {
            profilesrc = "images/avatar9.png"
        } else if (avatar == 11) {
            profilesrc = "images/avatar10.png"
        } else if (avatar == 12) {
            profilesrc = "images/avatar11.png"
        } else if (avatar == 13) {
            profilesrc = "images/avatar12.png"
        }

        strHtml += `
            <div class="card">
            <div class="card-header">
                <img src="./images/v549_186.png" class="img-fluid v549_186" alt="">
                <i class="mr-1"></i>${creation.city}
                <a class="mt-1 fa fa-bars fa-lg noscroll" style="float: right; color: black;" onclick="reportpub()"></a>
            </div>
            <img src="${src}" class="criacoesimg img-responsive" id="popupimg">
            <div class="card-footer">
                <img src="${profilesrc}" class="img-fluid smallkidimg">
                <i class="mr-1"></i> Autor: ${creation.user.name}
            </div>
        </div>
            `;
        forumcreations.innerHTML = strHtml;
        userID = creation.userID;
        IDcreation = creationID;
    }

    const renderImageComments = async () => {

        let strHtml = ``;

        const creationID = localStorage.getItem("idClickedPub");
        const response = await fetch(`http://localhost:80/api/image/comments/` + creationID)
        const comments = await response.json()
        let i = 1;
        for (const comment of comments) {

            let date = comment.published.split("T");

            let hours = date[1].split(".");

            let avatar = comment.userID.avatar;

            let profilesrc = null;

            if (avatar == 1) {
                profilesrc = "images/default-user-image.png"
            } else if (avatar == 2) {
                profilesrc = "images/avatar1.png"
            }
            else if (avatar == 3) {
                profilesrc = "images/avatar2.png"
            }
            else if (avatar == 4) {
                profilesrc = "images/avatar3.png"
            } else if (avatar == 5) {
                profilesrc = "images/avatar4.png"
            } else if (avatar == 6) {
                profilesrc = "images/avatar5.png"
            } else if (avatar == 7) {
                profilesrc = "images/avatar6.png"
            } else if (avatar == 8) {
                profilesrc = "images/avatar7.png"
            } else if (avatar == 9) {
                profilesrc = "images/avatar8.png"
            } else if (avatar == 10) {
                profilesrc = "images/avatar9.png"
            } else if (avatar == 11) {
                profilesrc = "images/avatar10.png"
            } else if (avatar == 12) {
                profilesrc = "images/avatar11.png"
            } else if (avatar == 13) {
                profilesrc = "images/avatar12.png"
            }

            let img = document.createElement("img");

            let src = img.src = "data:image/jpeg;base64," + comment.image;

            strHtml += `
                 <li class="comment user-comment">
 
                 <div class="info">
                     <a href="#">${comment.userID.name}</a>
                     <span>${date[0] + " " + hours[0]}</span>
                 </div>
 
                 <a class="avatar" href="#">
                     <img src="${profilesrc}" width="35" alt="Profile Avatar"/>
                 </a>
 
                 <p class="noscroll"><img src="${src}" width="150"></img></p>
 
                 </li>
                 `;


            i++
        }
        forumComments.innerHTML += strHtml;

    }

    const renderTextComments = async () => {

        let strHtml = ``;

        const creationID = localStorage.getItem("idClickedPub");
        const response = await fetch(`http://localhost:80/api/comments/creations/` + creationID)
        const comments = await response.json()
        let i = 1;
        for (const comment of comments) {

            let avatar = comment.userID.avatar;

            let profilesrc = null;

            if (avatar == 1) {
                profilesrc = "images/default-user-image.png"
            } else if (avatar == 2) {
                profilesrc = "images/avatar1.png"
            }
            else if (avatar == 3) {
                profilesrc = "images/avatar2.png"
            }
            else if (avatar == 4) {
                profilesrc = "images/avatar3.png"
            } else if (avatar == 5) {
                profilesrc = "images/avatar4.png"
            } else if (avatar == 6) {
                profilesrc = "images/avatar5.png"
            } else if (avatar == 7) {
                profilesrc = "images/avatar6.png"
            } else if (avatar == 8) {
                profilesrc = "images/avatar7.png"
            } else if (avatar == 9) {
                profilesrc = "images/avatar8.png"
            } else if (avatar == 10) {
                profilesrc = "images/avatar9.png"
            } else if (avatar == 11) {
                profilesrc = "images/avatar10.png"
            } else if (avatar == 12) {
                profilesrc = "images/avatar11.png"
            } else if (avatar == 13) {
                profilesrc = "images/avatar12.png"
            }

            strHtml += `
                <li class="comment user-comment">
    
                <div class="info">
                    <a href="#">${comment.userID.name}</a>
                    <span>${comment.date}</span>
                </div>
    
                <a class="avatar" href="#">
                <img src="${profilesrc}" width="35" alt="Profile Avatar"/>
                </a>
    
                <p class="noscroll">${comment.description}</p>
    
                </li>
                `;
            i++
        }
        forumComments.innerHTML += strHtml;

    }

    const renderEvaluation = async () => {

        let strHtml = ``;

        ///api/evaluation/{creationID}/users/{userID}

        const creationID = localStorage.getItem("idClickedPub");
        const response = await fetch(`http://localhost:80/api/evaluation/creation/` + creationID)
        const evaluations = await response.json();

        if (evaluations.length == 0) {

            document.getElementById("star1").checked = false;
            document.getElementById("star2").checked = false;
            document.getElementById("star3").checked = false;
            document.getElementById("star4").checked = false;
            document.getElementById("star5").checked = false;

        } else {
            for (const evaluation of evaluations) {

                if (evaluation.userID.userID == id) {

                    let nstar = evaluation.evaluation;

                    if (nstar == 1) {
                        document.getElementById("star1").checked = true;
                    } else if (nstar == 2) {
                        document.getElementById("star2").checked = true;
                    } else if (nstar == 3) {
                        document.getElementById("star3").checked = true;
                    } else if (nstar == 4) {
                        document.getElementById("star4").checked = true;
                    } else {
                        document.getElementById("star5").checked = true;
                    }
                }
            }
        }

        //buscar a avaliação que o user logged in fez da pub q está a ver//se for null n fazer nada
    }

    renderCreations();
    renderImageComments();
    renderTextComments();
    renderEvaluation();
}

let star1 = document.getElementById("star1");
let star2 = document.getElementById("star2");
let star3 = document.getElementById("star3");
let star4 = document.getElementById("star4");
let star5 = document.getElementById("star5");

star1.addEventListener("click", function () {
    evaluate("star1");
})
star2.addEventListener("click", function () {
    evaluate("star2");
})
star3.addEventListener("click", function () {
    evaluate("star3");
})
star4.addEventListener("click", function () {
    evaluate("star4");
})
star5.addEventListener("click", function () {
    evaluate("star5");
})


function evaluate(star) {
    let nstar = null;

    if (star == "star1") {
        nstar = parseInt(1);
    }
    else if (star == "star2") {
        nstar = parseInt(2);
    }
    else if (star == "star3") {
        nstar = parseInt(3);
    }
    else if (star == "star4") {
        nstar = parseInt(4);
    }
    else if (star == "star5") {
        nstar = parseInt(5);
    }

    // api/evaluation

    let data = {};
    data.creationID = IDcreation;
    data.userID = id;
    data.evaluation = nstar;

    fetch("http://localhost:80/api/evaluation", {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data)
    }).then(function (response) {
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
    }).then(function (result) {
    }).catch(function (err) {
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

let logout = document.getElementById("logout");

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

function dataURLtoBlob(dataurl) {

    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
}

let info = document.getElementById("info");
let helptxt = document.getElementById("helptxt");
let close = document.getElementById("close");
let isShowing = false;

info.addEventListener("click", function () {

    if (isShowing == false) {
        helptxt.style.display = "block";
        isShowing = true;
    }

});

close.addEventListener("click", function () {
    if (isShowing == true) {
        helptxt.style.display = "none";
        isShowing = false;
    }
});