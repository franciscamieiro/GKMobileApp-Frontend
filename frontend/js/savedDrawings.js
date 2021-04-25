let btnEdit = document.getElementById("btnEdit");
let btnDelete = document.getElementById("btnDelete");
let btnPublish = document.getElementById("btnPublish");

function goBack() {

    window.history.back();
        
}

function edit(element){
    let drawingsEditid = element.parent.id;
    localStorage.setItem("editDrawingid", drawingsEditid);
}

function del(element){
    let drawingid = element.getAttribute("name");
    console.log(drawingid);
    fetch('http://localhost:80/api/creations/' + drawingid, {
        method: 'DELETE',
        })
        .then(res => res.text()) // or res.json()
        .then(res => console.log(res))
}

function pub(element){
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
    }).then(function(response) {

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
    }).then(function(result) {
        console.log(result);
    }).catch(function(err) {
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

    const savedDrawings = document.getElementById("drawings");

    const renderDrawings = async() => {

        let strHtml = ``;

        const creationID = localStorage.getItem("id");
        const response = await fetch("http://localhost:80/api/creations/users/" + "23")
        const drawings = await response.json()
        let i = 1;

        console.log(drawings);
        
        for (const drawing of drawings) {

            strHtml += `
                <div id="drawingwrapper">
                <img class="drawing" src="../frontend/images/avatar1.png"></img>
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
