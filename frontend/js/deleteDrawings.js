let selectall = document.getElementById("checkboxAll");
let btnDelete = document.getElementById("btnDelete");
let actions = document.getElementsByClassName("action");

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

    let checkbox = document.getElementsByClassName("checkbox");
    
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

    let checkbox = document.getElementsByClassName("checkbox");
    

    if(actions.length !== 0){
       
        for(let i=0; i<checkbox.length; i++){
                
            if(checkbox[i].checked == true){
                checkbox[i].parentElement.parentElement.remove();
            }
        }  
   
    }

});