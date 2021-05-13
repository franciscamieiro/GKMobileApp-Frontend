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

            btnSendEmail.style.backgroundColor = "rgba(167,114,190,1)";
            btnSendEmail.style.color = "white";
            countdownEl.innerHTML = "0:00";
            clearInterval(timer);
        }
    }
}

let btnSendEmail = document.getElementById("btnSendEmail");
let registedEmail = localStorage.registedEmail;

console.log(registedEmail);

btnSendEmail.addEventListener("click", function() {

    fetch("http://localhost:80/api/registration/resend/" + registedEmail)
        .then((response) => response.json())
        .then(function(response) {

            if (!response.ok) {
                console.log(response.status); //=> number 100–599
                console.log(response.statusText); //=> String
                console.log(response.headers); //=> Headers
                console.log(response.url); //=> String
                if (response.status === 409) {
                    
                }
                else {
                    throw Error(response.statusText);
                }
            }else {

                swal({
                    icon: 'images/v254_5.png',
                    title: 'Sucesso',
                    text: 'Email reenviado com sucesso.',
                    button: 'OK',
                    className: "swalAlert"
                    
                });

                const countdownEl = document.getElementById("countDown");

                if(btnSendEmail.style.color == "white"){

                    //codigo para mandar um email

                    btnSendEmail.style.backgroundColor = "rgba(108,80,120,0.550000011920929)";
                    btnSendEmail.style.color = "rgb(197, 197, 197)";

                    const startingMinutes = 5;

                    let time = startingMinutes * 60;

                    let timer = setInterval(updateCountdown, 1000);

                    function updateCountdown() {

                        const minutes = Math.floor(time / 60);
                        let seconds = time % 60;

                        seconds = seconds < 10 ? '0'+ seconds : seconds; 

                        countdownEl.innerHTML = `${minutes}:${seconds}`;
                        time--;

                        if(minutes == 0){

                            btnSendEmail.style.backgroundColor = "rgba(167,114,190,1)";
                            btnSendEmail.style.color = "white";
                            countdownEl.innerHTML = "0:00";
                            clearInterval(timer);
                        }
                    } 
                }   
            } 

        }).then(function(result) {
            console.log(result);
        }).catch(function(err) {
            swal({
                icon: 'images/v237_21.png',
                title: 'Erro',
                text: 'Erro ao reenviar email.',
                button: 'OK',
                className: "swalAlert"
            });
            console.error(err);
        });
 
});

