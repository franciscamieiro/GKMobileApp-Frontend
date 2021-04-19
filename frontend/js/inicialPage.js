let logout = document.getElementById("logout");


logout.addEventListener("click", function(){

    fetch("http://localhost:80/api/auth/logout")
    .then((response) => response.json())
    .then((user) => {

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
            swal({
                icon: 'images/v254_5.png',
                title: 'Sucesso',
                text: 'Sessão terminada',
                button: 'OK',
                className: "swalAlert"
            }); 
        }               
        
    }).then(function(result) {
        console.log(result);
    }).catch(function(err) {
        swal({
            icon: 'images/v237_21.png',
            title: 'Erro',
            text: 'Ocorreu um Erro!',
            button: 'OK',
            className: "swalAlert"
        });
        console.error(err);
    });
});


