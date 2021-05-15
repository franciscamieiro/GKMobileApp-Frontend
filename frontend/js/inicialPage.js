let logout = document.getElementById("logout");
let info = document.getElementById("info");
let box = document.getElementById("box");
let box1 = document.getElementById("box1");
let helptxt = document.getElementById("helptxt");
let nextBtn = document.getElementById("next");
let click = 1;
let isShowing = false;

logout.addEventListener("click", function () {

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

info.addEventListener("click", function () {

    if (isShowing == false) {
        box.style.display = "block";
        helptxt.style.display = "block";
        nextBtn.style.display = "block";
        isShowing = true;
    }

});

function next() {

    if (document.body.clientWidth >= 328) {

        if (click == 1) {
            box.style.display = "none";
            box1.style.display = "block";
            helptxt.style.height = "12%";
            nextBtn.style.marginTop = "485px";
            helptxt.innerHTML = "Clica no icon amarelo para ver o forúm com publicações de criações, comentar e avaliar!"
            nextBtn.style.display = "block";
            click++;
        } else if (click == 2) {
            box1.style.display = "none";
            box.style.marginTop = "390px";
            helptxt.style.height = "12%";
            helptxt.style.marginTop = "250px";
            nextBtn.style.marginTop = "200px";
            box.style.display = "block";
            helptxt.innerHTML = "Clica no icon roxo para desenhar novos desenhos e ver desenhos que guardaste!"
            nextBtn.style.display = "block";
            click++;
        }
        else if (click == 3) {
            box.style.display = "none";
            box1.style.marginTop = "420px";
            helptxt.style.marginTop = "250px";
            nextBtn.style.marginTop = "200px";
            box1.style.display = "block";
            helptxt.style.height = "12%";
            helptxt.innerHTML = "Clica no icon azul para ver o mapa da tua cidade, marcar locais favoritos e tirar fotos!"
            nextBtn.innerHTML = "Fechar";
            nextBtn.style.display = "block";
            click++;
        } else {
            box.style.display = "none";
            box1.style.display = "none";
            helptxt.style.display = "none";
            nextBtn.style.display = "none";
            helptxt.innerHTML = "Clica no icon laranja para veres um caminho de um sítio para o outro!";
            box1.style.marginTop = "220px";
            box.style.marginTop = "190px";
            helptxt.style.marginTop = "345px";
            helptxt.style.height = "10%";
            nextBtn.innerHTML = "Próxima";
            nextBtn.style.marginTop = "472px";
            click = 1;
            isShowing = false;
        }

    }
}

