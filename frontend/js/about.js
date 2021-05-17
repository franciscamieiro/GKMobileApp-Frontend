function isConnected(){
    var ifConnected = window.navigator.onLine;

    if (ifConnected == false) {
        localStorage.setItem("lastWindow", "about.html")
        window.location.replace("no_connection.html");
    }

}

setInterval(isConnected, 5000);

var x1 = document.getElementById("myDIV");
var x2 = document.getElementById("myDIV2");
var x3 = document.getElementById("myDIV3");

function goBack() {
    window.history.back();

}

/*if(x1.style.display == "block"){
    var msg = new SpeechSynthesisUtterance("A app “GoKids” surgiu com o objetivo de tornar as cidades mais “child friendly” através da criação de um instrumento de construção de uma metodologia participativa, de mapeamento colaborativo e de projeto urbano.");
    msg.lang = 'pt-BR';
    window.speechSynthesis.speak(msg);
    speechSynthesis.cancel();
    var msg2 = new SpeechSynthesisUtterance("Através da conceção de um lugar virtual partilhado onde as crianças podem participar, enquanto cidadãos e utilizadores do espaço urbano, e ajudar a criar uma requalificação urbana com sugestões de soluções locais mais inclusivas às comunidades e, sobretudo, a elas mesmas (crianças). A aplicação mobile, desenvolvida com um design adaptado a crianças, foi o principal foco desta ideia.");
    msg2.lang = 'pt-BR';
    window.speechSynthesis.speak(msg2);
    speechSynthesis.cancel();
    var msg3 = new SpeechSynthesisUtterance("Esta permitiria suscitar o interesse das crianças na participação do ordenamento do território, envolvendo-as e incentivando-as a ser designers e arquitetas dos seus próprios espaços públicos. Através disso, permitia aos municípios contar com a criatividade e intervenção das crianças. Esta captação da atenção da criança poderia ser feita através de designs criativos e criação de jogos sérios que permitiriam não só umaexperiência divertida à criança, mas ao mesmo tempo amsua participação na melhoria dosespaços da sua cidade. Por outro lado, estes dados provenientes dasintervenções da criança, interessariam e muito a arquitetos, engenheiros eautarcas, que tem em sua responsabilidade intervir no ordenamento do território,através de obras de remodelação de espaços e construção de novos espaços. Estes dadosseriam um input importante, sobretudo para tornar as cidades mais “child friendly”.- Com esta aplicação tu próprio podes ter um papelimportante na tua cidade!Podes dar a tua opinião sobre os espaços da tua cidade, a até mesmo dar ideias e sugestões de como torná-la num espaço melhor. Estasideias e opiniões são importantes para que os adultos responsáveis possam tomar decisões de forma a deixar a tua cidade mais amiga das crianças!");
    msg3.lang = 'pt-BR';
    window.speechSynthesis.speak(msg3);
    speechSynthesis.cancel();
}*/


function showdiv() {
    if (x1.style.display === "none") {
        x1.style.display = "block";
    } else {
        x1.style.display = "none";
    }
}

function showdiv2() {
    if (x2.style.display === "none") {
        x2.style.display = "block";
    } else {
        x2.style.display = "none";
    }
}

function showdiv3() {
    if (x3.style.display === "none") {
        x3.style.display = "block";
    } else {
        x3.style.display = "none";
    }
}

let logout = document.getElementById("logout");

logout.addEventListener("click", function(){
    
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

});