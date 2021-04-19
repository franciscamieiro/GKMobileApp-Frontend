window.onload = () => {

    const forumcreations = document.getElementById("forum");

    const renderCreations = async() => {

        let strHtml = ``;

        const creationID = localStorage.getItem("id");
        const response = await fetch(`http://localhost:80/api/creations/` + creationID)
        const creations = await response.json()
        let i = 1;
        for (const creation of creations) {
            console.log(creations);
            strHtml += `
            <div class="card">
            <div class="card-header">
                <img src="./images/v549_186.png" class="img-fluid v549_186" alt="">
                <i class="mr-1"></i>${creation.city}
                <a class="mt-1 fa fa-bars fa-lg noscroll" style="float: right; color: black;" onclick="reportpub()"></a>
            </div>
            <img src="./images/v549_72.png" class="criacoesimg img-responsive" id="popupimg">
            <div class="card-footer">
                <img src="./images/avatar1.png" class="img-fluid smallkidimg">
                <i class="mr-1"></i> Autor: ${creation.user}
            </div>
        </div>
            `;

            i++;
        }
        forumcreations.innerHTML = strHtml;

    }

    renderCreations()
}