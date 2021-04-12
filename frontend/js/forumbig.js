function goBack() {
    window.history.back();
}

function coment() {

    swal({
        text: "Escolhe um",
        buttons: {
            cancel: "Escrever um comentário",
            confirm: "Escolher Ficheiro",
            hello: "Gravar Aúdio",
        },
    });



};