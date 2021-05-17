function isConnected(){
    var ifConnected = window.navigator.onLine;

    if (ifConnected == false) {
        localStorage.setItem("lastWindow", "start.html")
        window.location.replace("no_connection.html");
    }

}

setInterval(isConnected, 5000);

const id = localStorage.userloggedin;
const email = localStorage.registedEmail;

if(id != null){
    window.location.replace("inicialPage.html");
}


if(email != null){
    window.location.replace("registDone.html");
}

