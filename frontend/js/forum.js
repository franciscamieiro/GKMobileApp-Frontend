window.onload = () => {

    const forumcreations = document.getElementById("forum");

    const renderCreations = async() => {

        let strHtml = ``;

        const response = await fetch(`http://localhost:80/api/creations/published`)
        const creations = await response.json()
        let i = 1;

        if(creations.length != 0){
        for (const creation of creations) {
            console.log(creations);
            strHtml += `
            <div class="card mb-4">
                <a href="forumbig.html" id=${creation.creationID} onclick="reply_click(this.id)" ><img src="./images/v549_72.png" class="criacoesimg img-responsive" id="popupimg"></a>
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