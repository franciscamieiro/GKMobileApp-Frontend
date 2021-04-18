function isConnected(){
    var ifConnected = window.navigator.onLine;

    if (ifConnected) {
        window.location.replace("start.html");
    }

}

setInterval(isConnected, 5000);


