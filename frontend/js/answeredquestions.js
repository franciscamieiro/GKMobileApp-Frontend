function goBack() {
    window.history.back();
}

window.onload = () => {

    const answeredQuestionsTxt = document.getElementById("doubtsText");

    const renderAnsweredQuestionsTxt = async() => {

        let strHtml = ``;

        const response = await fetch(`http://localhost:80/api/doubts/users/`+ "3")
        const doubts = await response.json()
        let i = 1;
        for (const doubt of doubts) {
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
        answeredQuestionsTxt.innerHTML = strHtml;

    }

    renderAnsweredQuestionsTxt()
}