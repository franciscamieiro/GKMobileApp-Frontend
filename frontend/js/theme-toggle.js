
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const id = localStorage.userloggedin;
let theme = localStorage.getItem('theme');

if (theme == "dark") {

    toggleSwitch.checked = true;

} else {
    toggleSwitch.checked = false;
}

document.documentElement.setAttribute('data-theme', `${theme}`);

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');

        let data = {};
        data.theme = "dark";

        fetch("http://localhost:80/api/users/" + id + "/theme", {
            headers: { Accept: "application/json", "Content-type": "application/json; charset=UTF-8" },
            method: 'PUT',
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
                console.log(user.theme);
                //sucess
            }
        }).then(function (result) {
            console.log(result);
        }).catch(function (err) {

        });


    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');

        let data = {};
        data.theme = "light";


        fetch("http://localhost:80/api/users/" + id + "/theme", {
            headers: { Accept: "application/json", "Content-type": "application/json; charset=UTF-8" },
            method: 'PUT',
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
                console.log(user.theme);
                //sucess
            }
        }).then(function (result) {
            console.log(result);
        }).catch(function (err) {

        });

    }
}

toggleSwitch.addEventListener('change', switchTheme, false);