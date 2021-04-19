let btnEdit = document.getElementById("btnEdit");
let btnDelete = document.getElementById("btnDelete");
let btnPublish = document.getElementById("btnPublish");

function goBack() {

    window.history.back();
        
}

btnEdit.addEventListener("click", function(){
    window.location.href = "editDrawing.html";
});

btnDelete.addEventListener("click", function(){
    window.location.href="deleteDrawings.html";
});

btnPublish.addEventListener("click", function(){
    window.location.href = "publishDrawing.html";
});

window.onload = () => {

    const savedDrawings = document.getElementById("drawingswrapper");

    const renderDrawings = async() => {

        let strHtml = ``;

        const creationID = localStorage.getItem("id");
        const response = await fetch("http://localhost:80/api/creations/users/" + "4")
        const drawings = await response.json()
        let i = 1;
        
        for (const drawing of drawings) {

            strHtml += `
            <div id=${drawing.creationid} class="border"><img class="drawing" src="../frontend/images/avatar6.png">
                <div class="action"><input class="checkbox" type="checkbox"></div>
            </div>
            `;
            i++
        }
        savedDrawings.innerHTML = strHtml;

    }
    renderDrawings();
}
