function goBack() {
  window.history.back();
}

function logout() {

  swal({
    icon: 'images/v254_5.png',
    title: 'Sucesso',
    text: 'Sessão terminada',
    button: 'OK',
    className: "swalAlert"
  }).then((isConfirm) => {
    localStorage.clear();
    window.location.replace("login.html");
  });
}

function isConnected() {
  var ifConnected = window.navigator.onLine;

  if (ifConnected == false) {
    localStorage.lastWindow = "theme.html";
    window.location.replace("no_connection.html");
  }

}

setInterval(isConnected, 5000);
