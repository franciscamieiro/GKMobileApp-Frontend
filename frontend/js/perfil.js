let btnEdit = document.getElementById("btnEdit");

let fullname = document.getElementById("inputFullName");
let birth = document.getElementById("inputBirth");
let email = document.getElementById("inputEmail");
let city = document.getElementById("inputCity");
let pass = document.getElementById("inputPass");
let label = document.getElementById("label");
let label1 = document.getElementById("label1");
let body2 = document.getElementById("body2");
let allowphotoEdit = document.getElementById("allowphotoEdit");
let changephoto = document.getElementById("changephoto");
let profilePhoto = document.getElementById("profilePhoto");
let avatars = document.getElementById("avatars");
let avatar1 = document.getElementById("avatar1");
let avatar2 = document.getElementById("avatar2");
let avatar3 = document.getElementById("avatar3");
let avatar4 = document.getElementById("avatar4");
let avatar5 = document.getElementById("avatar5");
let avatar6 = document.getElementById("avatar6");
let avatar7 = document.getElementById("avatar7");
let avatar8 = document.getElementById("avatar8");
let avatar9 = document.getElementById("avatar9");
let avatarsrow1 = document.getElementById("avatarsrow1");
let avatarsrow2 = document.getElementById("avatarsrow2");
let avatarsrow3 = document.getElementById("avatarsrow3");
let navatar = null;
let changepass = true;
const id = localStorage.userloggedin;

//validate Email
function validateEmail(email) {
    
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());

}

//edit profile

//make's inputs editables
btnEdit.addEventListener("click", function() {

    if(fullname.disabled == true){
    
        btnEdit.innerHTML = 'Guardar';
        fullname.disabled = false;
        email.disabled = false;
        pass.disabled = false;
        label.style.display = "block";
        label1.style.display = "block";
        body2.style.height = "810px";
        city.disabled = false;
        allowphotoEdit.style.display = "block";

    }else{

        if(avatars.style.display == "block"){
            avatars.style.display = "none";
        }

        if(fullname.value == ""){

            swal({
                icon: 'images/warning.png',
                title: 'Atenção',
                text: 'Preenche o teu Nome!',
                button: 'OK',
                className: "swalAlert"
                
            }).then(function(isConfirm) {
                fullname.focus();
            });
            
        }

        else if(email.value == ""){

            swal({
                icon: 'images/warning.png',
                title: 'Atenção',
                text: 'Preenche o teu email!',
                button: 'OK',
                className: "swalAlert"
                
            }).then(function(isConfirm) {
                email.focus();
            });
            
        }
        
        else if(city.value == ""){

            swal({
                icon: 'images/warning.png',
                title: 'Atenção',
                text: 'Preenche a tua cidade!',
                button: 'OK',
                className: "swalAlert"
                
            }).then(function(isConfirm) {
                city.focus();
            });
            
        }
        else if(validateEmail(email.value) == false){

            swal({
                icon: 'images/v237_21.png',
                title: 'Atenção',
                text: 'O email não é válido.',
                button: 'OK',
                className: "swalAlert"
                
            }).then(function(isConfirm) {
                email.focus();
            });
    
        }
        
        else{

            if(pass.value == ""){

                changepass = false;
                
            }
            fetch("http://localhost:80/api/users/" + id)
            .then((response) => response.json())
            .then((user) => {
                   
                let data = {};
                data.name = fullname.value;
                data.email = email.value;
                data.birthDate = user.birthDate;
                data.city = city.value;
                data.avatarID = parseFloat(navatar);
                data.userID = parseFloat(id);

                if(changepass == true){
                    //fazer o put da password

                    let datapass = {};
                    datapass.newPassword = pass.value;
                    datapass.email = user.email;

                    console.log(datapass);
                    
                    ///{userID}/password

                    fetch("http://localhost:80/api/users/" + id + "/password", {
                    headers: { Accept: "application/json","Content-type": "application/json; charset=UTF-8" },
                    method: 'PUT',
                    body: JSON.stringify(datapass)
                    }).then(function(response) {

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
                        }
                    }).then(function(result) {
                        console.log(result);
                    }).catch(function(err) {
                        swal({
                            icon: 'images/v237_21.png',
                            title: 'Erro',
                            text: 'Ocorreu um erro',
                            button: 'OK',
                            className: "swalAlert"
                        });
                    console.error(err);
                    });
                }
                
                console.log(data);
                
                   
                fetch("http://localhost:80/api/users/" + id, {
                    headers: { Accept: "application/json","Content-type": "application/json; charset=UTF-8" },
                    method: 'PUT',
                    body: JSON.stringify(data)
                }).then(function(response) {

                    if (!response.ok) {
                        console.log(response.status); //=> number 100–599
                        console.log(response.statusText); //=> String
                        console.log(response.headers); //=> Headers
                        console.log(response.url); //=> String
                        if (response.status === 409) {
                            swal({
                                icon: 'images/v237_21.png',
                                title: 'Erro',
                                text: 'Dados incorretos!',
                                button: 'OK',
                                className: "swalAlert"
                            });
                        }
                        else {
                            throw Error(response.statusText);
                        }
                    }
                    else {
                        swal({
                            icon: 'images/v254_5.png',
                            title: 'Sucesso',
                            text: 'Dados Guardados!',
                            buttons: false,
                            className: "swalAlertSucess"
                            
                        }).then(function(isConfirm) {
            
                            btnEdit.innerHTML = 'Editar';
                            fullname.disabled = true;
                            email.disabled = true;
                            pass.disabled = true;
                            allowphotoEdit.style.display = "none";
            
                        });
                    }
                }).then(function(result) {
                    console.log(result);
                }).catch(function(err) {
                    swal({
                        icon: 'images/v237_21.png',
                        title: 'Erro',
                        text: 'Ocorreu um erro',
                        button: 'OK',
                        className: "swalAlert"
                    });
                    console.error(err);
                });
                  
            });

            
        }
    }
    
});

changephoto.addEventListener("click", function() {

    avatars.style.display = "block";

});

avatar1.addEventListener("click", function(){

    profilePhoto.setAttribute('src', "../frontend/images/avatar1.png");
    avatars.style.display = "none";
    navatar = 2;
});

avatar2.addEventListener("click", function(){

    profilePhoto.setAttribute('src', "../frontend/images/avatar2.jpg");
    avatars.style.display = "none";
    navatar = 3;
});
avatar3.addEventListener("click", function(){

    profilePhoto.setAttribute('src', "../frontend/images/avatar3.jpg");
    avatars.style.display = "none";
    navatar = 4;
});
avatar4.addEventListener("click", function(){

    profilePhoto.setAttribute('src', "../frontend/images/avatar4.jpeg");
    avatars.style.display = "none";
    navatar = 5;
});
avatar5.addEventListener("click", function(){

    profilePhoto.setAttribute('src', "../frontend/images/avatar5.jpg");
    avatars.style.display = "none";
    navatar = 6;
});
avatar6.addEventListener("click", function(){

    profilePhoto.setAttribute('src', "../frontend/images/avatar6.png");
    avatars.style.display = "none";
    navatar = 7;
});
avatar7.addEventListener("click", function(){

    profilePhoto.setAttribute('src', "../frontend/images/avatar7.jpg");
    avatars.style.display = "none";
    navatar = 8;
});
avatar8.addEventListener("click", function(){

    profilePhoto.setAttribute('src', "../frontend/images/avatar8.jpg");
    avatars.style.display = "none";
    navatar = 9;
});
avatar9.addEventListener("click", function(){

    profilePhoto.setAttribute('src', "../frontend/images/avatar9.png");
    avatars.style.display = "none";
    navatar = 10;
});

avatar10.addEventListener("click", function(){

    profilePhoto.setAttribute('src', "../frontend/images/avatar10.jpg");
    avatars.style.display = "none";
    navatar = 11;
});
avatar11.addEventListener("click", function(){

    profilePhoto.setAttribute('src', "../frontend/images/avatar11.jpg");
    avatars.style.display = "none";
    navatar = 12;
});
avatar12.addEventListener("click", function(){

    profilePhoto.setAttribute('src', "../frontend/images/avatar12.jpg");
    avatars.style.display = "none";
    navatar = 13;
});
avatar0.addEventListener("click", function(){

    profilePhoto.setAttribute('src', "../frontend/images/default-user-image.png");
    avatars.style.display = "none";
    navatar = 1;
});

window.onload = async() => {
    const response = await fetch("http://localhost:80/api/users/" + id);
    const user = await response.json();

    console.log(user);
    let name = user.name;
    let email = user.email;
    let city = user.city;
    let birthDate = user.birthDate.split('-').reverse().join('-');
    let avatar = user.avatar;
    navatar = avatar;

    console.log(name, email, city, birthDate, avatar);

    document.getElementById('inputFullName').value = name;
    document.getElementById('inputEmail').value = email;
    document.getElementById('inputBirth').value = birthDate;
    document.getElementById('inputCity').value = city;

    if(avatar == 1){
        document.getElementById('profilePhoto').src = "../frontend/images/default-user-image.png";
    }else if(avatar == 2){
        document.getElementById('profilePhoto').src = "../frontend/images/avatar1.png";
    }else if(avatar == 3){
        document.getElementById('profilePhoto').src = "../frontend/images/avatar2.jpg";
    }else if(avatar == 4){
        document.getElementById('profilePhoto').src = "../frontend/images/avatar3.jpg";
    }else if(avatar == 5){
        document.getElementById('profilePhoto').src = "../frontend/images/avatar4.jpeg";
    }else if(avatar == 6){
        document.getElementById('profilePhoto').src = "../frontend/images/avatar5.jpg";
    }else if(avatar == 7){
        document.getElementById('profilePhoto').src = "../frontend/images/avatar6.png";
    }else if(avatar == 8){
        document.getElementById('profilePhoto').src = "../frontend/images/avatar7.jpg";
    }else if(avatar == 9){
        document.getElementById('profilePhoto').src = "../frontend/images/avatar8.jpg";
    }else if(avatar == 10){
        document.getElementById('profilePhoto').src = "../frontend/images/avatar9.png";
    }else if(avatar == 11){
        document.getElementById('profilePhoto').src = "../frontend/images/avatar10.jpg";
    }else if(avatar == 12){
        document.getElementById('profilePhoto').src = "../frontend/images/avatar11.jpg";
    }else if(avatar == 13){
        document.getElementById('profilePhoto').src = "../frontend/images/avatar12.jpg";
    }else{
        document.getElementById('profilePhoto').src = "../frontend/images/default-user-image.png";
    }
    
    
};           


        
            
