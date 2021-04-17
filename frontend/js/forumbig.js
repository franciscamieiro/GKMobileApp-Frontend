function goBack() {
    window.history.back();
}

function coment() {

    swal({
        text: "Escolhe um",
        buttons: {
            cancel: {
                text: "Escrever um comentário",
                value: true,
                visible: true,
                className: "orange",
                closeModal: true
            },
            confirm: {
                text: "Escolher ficheiro",
                value: true,
                visible: true,
                className: "blue",
                closeModal: true
            },
            hello: {
                text: "Gravar aúdio",
                value: true,
                visible: true,
                className: "green",
                closeModal: true
            },

        },
    });



};


function showdiv() {
    var x = document.getElementById("browhy");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}