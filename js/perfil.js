let btnEdit = document.getElementById("btnEdit");

let username = document.getElementById("inputUsername");
let fullname = document.getElementById("inputFullName");
let birth = document.getElementById("inputBirth");
let email = document.getElementById("inputEmail");
let pass = document.getElementById("inputPass");
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
let backicon = document.getElementById("backicon");
let nexticon = document.getElementById("nexticon");
let avatarsrow1 = document.getElementById("avatarsrow1");
let avatarsrow2 = document.getElementById("avatarsrow2");
let avatarsrow3 = document.getElementById("avatarsrow3");

//edit profile

//make's inputs editables
btnEdit.addEventListener("click", function() {

    if(username.disabled == true){
    
        btnEdit.innerHTML = 'Guardar';
        username.disabled = false;
        fullname.disabled = false;
        birth.disabled = false;
        email.disabled = false;
        pass.disabled = false;
        allowphotoEdit.style.display = "block";

    }else{

        btnEdit.innerHTML = 'Editar';
        username.disabled = true;
        fullname.disabled = true;
        birth.disabled = true;
        email.disabled = true;
        pass.disabled = true;
        allowphotoEdit.style.display = "none";
    }
    
});

changephoto.addEventListener("click", function() {

    avatars.style.display = "block";

});

nexticon.addEventListener("click", function(){

    profilePhoto.setAttribute('src', "../frontend/images/avatar1.png");

});

backicon.addEventListener("click", function(){

    

});


avatar1.addEventListener("click", function(){

    profilePhoto.setAttribute('src', "../frontend/images/avatar1.png");
    avatars.style.display = "none";

});

avatar2.addEventListener("click", function(){

    profilePhoto.setAttribute('src', "../frontend/images/avatar2.jpg");
    avatars.style.display = "none";

});
avatar3.addEventListener("click", function(){

    profilePhoto.setAttribute('src', "../frontend/images/avatar3.jpg");
    avatars.style.display = "none";

});
avatar4.addEventListener("click", function(){

    profilePhoto.setAttribute('src', "../frontend/images/avatar4.jpeg");
    avatars.style.display = "none";

});
avatar5.addEventListener("click", function(){

    profilePhoto.setAttribute('src', "../frontend/images/avatar5.jpg");
    avatars.style.display = "none";

});
avatar6.addEventListener("click", function(){

    profilePhoto.setAttribute('src', "../frontend/images/avatar6.png");
    avatars.style.display = "none";

});
avatar7.addEventListener("click", function(){

    profilePhoto.setAttribute('src', "../frontend/images/avatar7.jpg");
    avatars.style.display = "none";

});
avatar8.addEventListener("click", function(){

    profilePhoto.setAttribute('src', "../frontend/images/avatar8.jpg");
    avatars.style.display = "none";

});
avatar9.addEventListener("click", function(){

    profilePhoto.setAttribute('src', "../frontend/images/avatar9.png");
    avatars.style.display = "none";

});
        
            
