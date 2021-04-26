function goBack() {
    window.history.back();
}

const id = localStorage.userloggedin;

window.onload = () => {

    const answeredQuestionsTxt = document.getElementById("doubtsText");
    const answeredQuestionsAudio = document.getElementById("doubtsAudio");

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

    const renderAnsweredQuestionsAudio = async() => {

        let strHtml = ``;

        const response = await fetch(`http://localhost:80/api/doubts/users/`+ id)
        const doubts = await response.json()
        let i = 1;
        for (const doubt of doubts) {
            if((!(doubt.answer == null)) && doubt.description == null){
                console.log(doubts);
                strHtml += `
                <div class="card mb-4" id="${doubt.doubtid}">
                    <div class="card-body text-center">
                        <b class="mr-1">Dúvida</b>
                        <hr>
                        <audio class="playerv1" controls>
                            <source src="images/movie_1.mp3" type="audio/mpeg">
                        </audio>
                        <div class="mr-1 justmargin"><b>Resposta</b></div>
                        <hr>
                        <div class="respostav2">${doubt.answer}</div>
                    </div>
                </div>
                `;
                i++;
            }            
        }
        answeredQuestionsAudio.innerHTML = strHtml;

    }

    renderAnsweredQuestionsTxt();
    renderAnsweredQuestionsAudio();
}
