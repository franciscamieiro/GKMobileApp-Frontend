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
