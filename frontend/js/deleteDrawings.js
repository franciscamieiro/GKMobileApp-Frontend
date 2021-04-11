let selectall = document.getElementById("checkboxAll");
let btnDelete = document.getElementById("btnDelete");
let actions = document.getElementsByClassName("action");
let checkbox = document.getElementsByClassName("checkbox");

window.onload = function(){
    for(let i=0; i<actions.length; i++){
        actions[i].style.display = "block";
    }
}

function goBack() {

    window.history.back();
        
}

function isOdd(n) {
    return Math.abs(n % 2) == 1;
}

let nclick = 0;

selectall.addEventListener("click", function() {
    
    nclick++;

    if(isOdd(nclick)){
        for(let i=0; i<checkbox.length; i++){
            checkbox[i].checked = true;
        }
    }
    else{
        for(let i=0; i<checkbox.length; i++){
            checkbox[i].checked = false;
        }
    }

});

btnDelete.addEventListener("click", function() {
    
    let count = 0;

    if(actions.length !== 0){
       
        for(let i=0; i<checkbox.length; i++){
                
            if(checkbox[i].checked == true){
                count++;

                if(count == checkbox.length){
                    document.getElementById("drawingswrapper").innerHTML = "";
                }

                else{
                    for(let i=0; i<checkbox.length; i++){
                        if(checkbox[i].checked == true){
                            checkbox[i].parentElement.parentElement.remove();
                        }
                    }

                }
            }
        }

        //IF CHEBOXALL ESTÁ SELECIONADA DO LINHA 135 , ELSE DO CHECKBOX[i].REMOVE();

        
   
    }

});