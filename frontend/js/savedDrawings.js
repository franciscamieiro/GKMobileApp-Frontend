let actions = document.getElementsByClassName("action");
let checkbox = document.getElementsByClassName("checkbox");
let btnDelelete = document.getElementById("btnDelete");
let btnEdit = document.getElementById("btnEdit");
let btnPublish = document.getElementById("btnPublish");
let buttonsPlane = document.getElementById("buttonsPlane");
let DeletePlane = document.getElementById("DeletePlane");
let EditPlane = document.getElementById("EditPlane");
let PublishPlane = document.getElementById("PublishPlane");
let selectall = document.getElementById("checkboxAll");
let title = document.getElementById("title");
let btnDeletefinal = document.getElementById("btnDeletefinal");


function goBack() {

    if(actions.length !== 0){
    
        if(actions[0].style.display == "block"){
            
            for(let i=0; i<actions.length; i++){
                
                actions[i].style.display = "none";
                
            }

            if(checkbox[0].style.display == "block"){
                for(let i=0; i<checkbox.length; i++){
                    
                    checkbox[i].checked = false;
                    
                }
            }
            if(DeletePlane.style.display == "block"){
                DeletePlane.style.display = "none";
                buttonsPlane.style.display = "block";
            }
            
            if(selectall.checked == true){
                selectall.checked = false;
            }
            if(title.innerHTML !== "Os meus desenhos"){
                title.innerHTML = "Os meus desenhos";
            }

        }
    }

    else if(EditPlane.style.display == "block"){
        EditPlane.style.display = "none";
        buttonsPlane.style.display = "block";
    }
    else if(PublishPlane.style.display == "block"){
        PublishPlane.style.display = "none";
        buttonsPlane.style.display = "block";
    }
    
    else{
        window.history.back();
    }
    
}

function show() {
    if(actions.length !== 0){

        for(let i=0; i<actions.length; i++){
            actions[i].style.display = "block";
        }

        for(let i=0; i<checkbox.length; i++){
            checkbox[i].style.display = "block";
        }
    }
}

btnDelelete.addEventListener("click", function() {
    title.innerHTML = "Apagar desenhos";
    buttonsPlane.style.display = "none";
    DeletePlane.style.display = "block";
    PublishPlane.style.display = "none";
    EditPlane.style.display = "none";
    show();
});


btnEdit.addEventListener("click", function() {
    title.innerHTML = "Editar desenho";
    buttonsPlane.style.display = "none";
    DeletePlane.style.display = "none";
    PublishPlane.style.display = "none";
    EditPlane.style.display = "block";
});

btnPublish.addEventListener("click", function() {
    title.innerHTML = "Publicar desenho";
    buttonsPlane.style.display = "none";
    DeletePlane.style.display = "none";
    EditPlane.style.display = "none";
    PublishPlane.style.display = "block";
});

selectall.addEventListener("click", function() {
    if(actions.length !== 0){

        for(let i=0; i<checkbox.length; i++){
            
            if(checkbox[i].checked == false)
            checkbox[i].checked = true;

            else
            checkbox[i].checked = false;
        }
    }

});


btnDeletefinal.addEventListener("click", function() {
    
    let count = 0;

    if(actions.length !== 0){
       
        for(let i=0; i<checkbox.length; i++){
                
            if(checkbox[i].checked == true){
                count++;
            }
        }

        //IF CHEBOXALL ESTÁ SELECIONADA DO LINHA 135 , ELSE DO CHECKBOX[i].REMOVE();

        if(count == checkbox.length){
            document.getElementById("drawingswrapper").innerHTML = "";
        }
    }

});