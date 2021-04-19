let selectall = document.getElementById("checkboxAll");
let btnDelete = document.getElementById("btnDelete");
let actions = document.getElementsByClassName("action");

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
                <div class="action" display="block"><input class="checkbox" type="checkbox"></div>
            </div>
            `;
            i++
        }
        savedDrawings.innerHTML = strHtml;

    }
    renderDrawings();
    
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