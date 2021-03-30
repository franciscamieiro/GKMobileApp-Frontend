window.onload = function() {

    const startingMinutes = 5;

    let time = startingMinutes * 60;

    const countdownEl = document.getElementById("countDown");

    let timer = setInterval(updateCountdown, 1000);

    function updateCountdown() {

        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        seconds = seconds < 10 ? '0'+ seconds : seconds; 

        countdownEl.innerHTML = `${minutes}:${seconds}`;
        time--;

        if(minutes == 0){

            document.getElementById("btnDisabled").style.display = "none";
            countdownEl.innerHTML = "0:00";
            clearInterval(timer);
        }
    }

}

let btnSendEmail = document.getElementById("btnSendEmail");

btnSendEmail.addEventListener("click", function() {

    //codigo para mandar um email

    document.getElementById("btnDisabled").style.display = "block";

    const startingMinutes = 5;

    let time = startingMinutes * 60;

    const countdownEl = document.getElementById("countDown");

    let timer = setInterval(updateCountdown, 1000);

    function updateCountdown() {

        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        seconds = seconds < 10 ? '0'+ seconds : seconds; 

        countdownEl.innerHTML = `${minutes}:${seconds}`;
        time--;

        if(minutes == 0){

            document.getElementById("btnDisabled").style.display = "none";
            countdownEl.innerHTML = "0:00";
            clearInterval(timer);
        }
    } 
        
});

