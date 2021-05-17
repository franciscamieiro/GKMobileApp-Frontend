function isConnected(){
    var ifConnected = window.navigator.onLine;

    if (ifConnected == false) {
        localStorage.lastWindow =  "forum.html";
        window.location.replace("no_connection.html");
    }

}

setInterval(isConnected, 5000);

window.onload = () => {

    const forumcreations = document.getElementById("forum");

    const renderCreations = async () => {

        let strHtml = ``;

        const response = await fetch(`http://localhost:80/api/creations/published`)
        const creations = await response.json()
        let i = 1;

        if (creations.length != 0) {
            for (const creation of creations) {

                let img = document.createElement("img");

                let src = img.src = "data:image/jpeg;base64," + creation.image;

                strHtml += `
            <div class="card mb-4">
                <a href="forumbig.html" id=${creation.creationID} onclick="reply_click(this.id)" ><img src="${src}" class="criacoesimg img-responsive" id="popupimg"></a>
                <div class="card-footer text-left">
                    <img src="./images/v549_68.png" class="img-fluid v549_186" alt="">
                    <i class="mr-1"></i> ${creation.city}
                </div>
            </div>
            `;

                i++;
            }
            forumcreations.innerHTML = strHtml;
        }
    }

    renderCreations()
}

function reply_click(clicked_id) {
    localStorage.setItem("idClickedPub", clicked_id);
}

let logout = document.getElementById("logout");

logout.addEventListener("click", function(){
    
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