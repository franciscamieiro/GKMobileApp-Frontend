function isConnected(){
    var ifConnected = window.navigator.onLine;

    if (ifConnected == false) {
        window.location.replace("no_connection.html");
    }

}

setInterval(isConnected, 5000);