function isConnected(){
    var ifConnected = window.navigator.onLine;

    if (ifConnected) {
        const window1 = localStorage.lastWindow;
        console.log(window1);
        window.location.replace(window1);
    }

}

setInterval(isConnected, 5000);


