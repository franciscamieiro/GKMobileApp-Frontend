let state = false;

//function reveal password
function toggle() {

    if (state) {
        document.getElementById("inputPassword").setAttribute("type", "password");
        state = false;
    }
    else {
        document.getElementById("inputPassword").setAttribute("type", "text");
        state = true;
    }
};

let createAccount = document.getElementById("createAccount");

createAccount.addEventListener("click", function () {

    window.location.replace("regist.html");

});


function validateEmail(email) {

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());

}


//function login user
let btnLogin = document.getElementById("LogIn");

btnLogin.addEventListener("click", function () {

    let email = document.getElementById("inputEmail");
    let password = document.getElementById("inputPassword");

    if (email.value == "") {
        swal({
            icon: 'images/warning.png',
            title: 'Atenção',
            text: 'Preenche o teu Email!',
            button: 'OK',
            className: "swalAlert"

        }).then(function (isConfirm) {
            email.focus();
        });
    }

    else if (password.value == "") {
        swal({
            icon: 'images/warning.png',
            title: 'Atenção',
            text: 'Preenche a tua Palavra-Passe!',
            button: 'OK',
            className: "swalAlert"

        }).then(function (isConfirm) {
            password.focus();
        });
    }

    else {

        // /api/auth/signin POST

        let data = {};
        data.email = email.value.trim();
        data.password = password.value.trim();

        fetch("http://localhost:80/api/auth/signin", {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(data)
        }).then(function (response) {

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
            }
            else {

                response.text().then(function (text) {

                    let see = text.split("objectId");

                    var regex = /\d+/g;
                    var string = see[1].toString();
                    var matches = string.match(regex);

                    let id = matches[0];
                    localStorage.setItem("userloggedin", id);


                    fetch("http://localhost:80/api/users/" + id)
                        .then((response) => response.json())
                        .then((user) => {

                            let theme = user.theme;

                            if (theme == "light") {

                                localStorage.setItem('theme', 'light');

                            } else if (theme == "dark") {

                                localStorage.setItem('theme', 'dark');

                            }

                            window.location.replace("inicialPage.html");

                        });


                });

            }
        }).then(function (result) {
            console.log(result);
        }).catch(function (err) {
            swal({
                icon: 'images/v237_21.png',
                title: 'Erro',
                text: 'Dados incorretos',
                button: 'OK',
                className: "swalAlert"

            }).then(function (isConfirm) {
                email.focus();
            });
            console.error(err);
        });

    }

});