function logout(){
    

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
}

function isConnected(){
    var ifConnected = window.navigator.onLine;

    if (ifConnected == false) {
        localStorage.setItem("lastWindow", "settings.html")
        window.location.replace("no_connection.html");
    }

}

setInterval(isConnected, 5000);

let tema = localStorage.getItem('theme');

function changebgimg(){

    if(tema == 'dark'){
        document.getElementById('f1').className = 'v124_205_v2';
        document.getElementById('f2').className = 'v124_217_v2';
        document.getElementById('f3').className = 'v124_222_v2';
    }
    else{
        document.getElementById('f1').className = 'v124_205';
        document.getElementById('f2').className = 'v124_217';
        document.getElementById('f3').className = 'v124_222';
    }
}