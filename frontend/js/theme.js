/*window.onload = function() {

  let theme = localStorage.getItem("theme");
  
  if(theme == "lightmode"){

    document.getElementById('theme').setAttribute('href', './css/theme.css');
  }else{
    document.getElementById('theme').setAttribute('href', './css/themeDM.css');
  }

}*/

function goBack() {
  window.history.back();
}

let color = document.getElementById("btnThemecolor");
let btnTheme = document.getElementById("btnTheme");

btnTheme.addEventListener("click", function() {

  if(color.style.backgroundColor !== 'grey'){
    color.style.backgroundColor = 'grey';
    localStorage.setItem("theme", "lightmode");
  }
  
  else{
  color.style.backgroundColor = '#07B82E';
  localStorage.setItem("theme", "darkmode");
}

});

