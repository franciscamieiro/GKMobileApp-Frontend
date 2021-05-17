function isConnected(){
    var ifConnected = window.navigator.onLine;

    if (ifConnected == false) {
        localStorage.setItem("lastWindow", "changePassword.html")
        window.location.replace("no_connection.html");
    }

}

setInterval(isConnected, 5000);

let state= false;
const inputemail = document.getElementById("inputEmail");
const changePass = document.getElementById("changePass");

changePass.addEventListener("click", function(){
    
    if(inputemail.value == ""){

        swal({
            icon: 'images/warning.png',
            title: 'Atenção',
            text: 'Escreve o teu email!',
            button: 'OK',
            className: "swalAlert"
            
        }).then(function(isConfirm) {
            inputemail.focus();
        });

    }

    else {

        fetch("http://localhost:80/api/users/email/" + inputemail.value)
            .then((user) => user.json())
            .then(function (user) {

                console.log(user);

                if(user != null){

                fetch("http://localhost:80/api/users/" + user + "/newPassword")
                    .then((response) => response.json())
                    .then(function (response) {

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
                        } else {

                            swal({
                                icon: 'images/v254_5.png',
                                title: 'Sucesso',
                                text: 'Email reenviado com sucesso.',
                                button: 'OK',
                                className: "swalAlert"

                            });

                            const countdownEl = document.getElementById("countDown");

                            if (btnSendEmail.style.color == "white") {

                                //codigo para mandar um email

                                btnSendEmail.style.backgroundColor = "rgba(108,80,120,0.550000011920929)";
                                btnSendEmail.style.color = "rgb(197, 197, 197)";

                                const startingMinutes = 5;

                                let time = startingMinutes * 60;

                                let timer = setInterval(updateCountdown, 1000);

                                function updateCountdown() {

                                    const minutes = Math.floor(time / 60);
                                    let seconds = time % 60;

                                    seconds = seconds < 10 ? '0' + seconds : seconds;

                                    countdownEl.innerHTML = `${minutes}:${seconds}`;
                                    time--;

                                    if (minutes == 0) {

                                        btnSendEmail.style.backgroundColor = "rgba(167,114,190,1)";
                                        btnSendEmail.style.color = "white";
                                        countdownEl.innerHTML = "0:00";
                                        clearInterval(timer);
                                    }
                                }
                            }
                        }

                    }).then(function (result) {
                        console.log(result);
                    }).catch(function (err) {
                        swal({
                            icon: 'images/v237_21.png',
                            title: 'Erro',
                            text: 'Erro ao reenviar email.',
                            button: 'OK',
                            className: "swalAlert"
                        });
                        console.error(err);
                    });
                }else{
                    swal({
                        icon: 'images/v237_21.png',
                        title: 'Erro',
                        text: 'Esse email não está registado.',
                        button: 'OK',
                        className: "swalAlert"
                    });
                }

            }).then(function (result) {
                console.log(result);
            }).catch(function (err) {
                swal({
                    icon: 'images/v237_21.png',
                    title: 'Erro',
                    text: 'Erro ao reenviar email.',
                    button: 'OK',
                    className: "swalAlert"
                });
                console.error(err);
            });





        //fetch que procura o email na bd, se não existir dizer que o email n está registado
        //window.location.replace("login.html");

    }


})