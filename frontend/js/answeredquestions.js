function isConnected(){
    var ifConnected = window.navigator.onLine;

    if (ifConnected == false) {
        localStorage.setItem("lastWindow", "answeredquestions.html")
        window.location.replace("no_connection.html");
    }

}

setInterval(isConnected, 5000);

function goBack() {
    window.history.back();
}

const id = localStorage.userloggedin;

window.onload = () => {

    const answeredQuestionsTxt = document.getElementById("doubtsText");

    const renderAnsweredQuestionsTxt = async() => {

        let strHtml = ``;

        const response = await fetch(`http://localhost:80/api/doubts/users/`+ id)
        const doubts = await response.json()
        let i = 1;
        for (const doubt of doubts) {
            if((!(doubt.answer == null)) && doubt.audio == null){
                console.log(doubts);
                strHtml += `
                <div class="card mb-4" id="${doubt.doubtid}">
                    <div class="card-body text-center">
                        <b class="mr-1">Dúvida</b>
                        <hr>
                        <div class="respostav3">${doubt.description}</div>

                        <div class="mr-1 justmargin"><b>Resposta</b></div>
                        <hr>
                        <div class="respostav2">${doubt.answer}</div>
                    </div>
                </div>
                `;
                i++;
            }            
        }
        answeredQuestionsTxt.innerHTML = strHtml;

    }

    renderAnsweredQuestionsTxt();
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
