function isConnected() {
    var ifConnected = window.navigator.onLine;

    if (ifConnected == false) {
        localStorage.setItem("lastWindow", "savedDrawings.html")
        window.location.replace("no_connection.html");
    }

}

setInterval(isConnected, 5000);

let btnEdit = document.getElementById("btnEdit");
let btnDelete = document.getElementById("btnDelete");
let btnPublish = document.getElementById("btnPublish");
const id = localStorage.userloggedin;
const savedDrawings = document.getElementById("drawings");

function goBack() {

    window.history.back();

}

function edit(element) {
    let drawingsEditid = element.getAttribute("name");
    localStorage.setItem("editDrawingid", drawingsEditid);
    window.location.replace("canvas.html");
}

function del(element) {
    let drawingid = element.getAttribute("name");
    console.log(drawingid);
    fetch('http://localhost:80/api/creations/' + drawingid, {
        method: 'DELETE',
    })
        .then(res => res.text()) // or res.json()
        .then(res => console.log(res))
        .then(function (response) {

            savedDrawings.innerHTML = "";

            const renderDrawings = async () => {

                let strHtml = ``;

                const response = await fetch("http://localhost:80/api/creations/users/" + id)
                const drawings = await response.json()
                let i = 1;

                for (const drawing of drawings) {

                    let img = document.createElement("img");

                    let src = img.src = "data:image/png;base64," + drawing.image;

                    strHtml += `
                        <div id="drawingwrapper">
                        <img class="drawing" src="${src}"></img>
                        <div class="buttonsPlane">
                            <ul>
                                <li id="btnEdit" name=${drawing.creationID} onclick="edit(this);">
                                    <div id="btnEditicon"></div>
                                </li>
                                <li id="btnDelete" name=${drawing.creationID} onclick="del(this);">
                                    <div id="btnDelicon"></div>
                                </li>
                                <li id="btnPublish" name=${drawing.creationID} onclick="pub(this);">
                                    <div id="btnPubliicon"></div>
                                </li>
                            </ul>
                    
                        </div>
                    </div>
                    `;
                    i++
                }

                savedDrawings.innerHTML = strHtml;

            }
            renderDrawings();

        });
}

function pub(element) {
    let drawingid = element.getAttribute("name");

    let data = {};
    data.published = parseInt(1);
    data.datePublished = new Date();
    data.creationID = parseFloat(drawingid);

    console.log(data);

    fetch("http://localhost:80/api/creations/published/" + drawingid, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
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
                text: 'Desenho publicado!',
                buttons: false,
                className: "swalAlertSucess"

            });
        }
    }).then(function (result) {
        console.log(result);
    }).catch(function (err) {
        swal({
            icon: 'images/v237_21.png',
            title: 'Erro',
            text: 'Ocorreu um Erro!',
            button: 'OK',
            className: "swalAlert"
        });
        console.error(err);
    });
}

window.onload = () => {

    const renderDrawings = async () => {

        let strHtml = ``;

        const creationID = localStorage.getItem("id");
        const response = await fetch("http://localhost:80/api/creations/users/" + id)
        const drawings = await response.json()
        let i = 1;

        for (const drawing of drawings) {

            let img = document.createElement("img");

            let src = img.src = "data:image/png;base64," + drawing.image;

            strHtml += `
                <div id="drawingwrapper">
                <img class="drawing" src="${src}"></img>
                <div class="buttonsPlane">
                    <ul>
                        <li id="btnEdit" name=${drawing.creationID} onclick="edit(this);">
                            <div id="btnEditicon"></div>
                        </li>
                        <li id="btnDelete" name=${drawing.creationID} onclick="del(this);">
                            <div id="btnDelicon"></div>
                        </li>
                        <li id="btnPublish" name=${drawing.creationID} onclick="pub(this);">
                            <div id="btnPubliicon"></div>
                        </li>
                    </ul>
            
                </div>
            </div>
            `;
            i++
        }

        savedDrawings.innerHTML = strHtml;

    }
    renderDrawings();
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