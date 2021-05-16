function instructionsCorona(){
    document.getElementById("instructions").style.display = "block";
}

document.getElementById("close").addEventListener("click", function(){
    document.getElementById("instructions").style.display = "none";
});

const id = localStorage.userloggedin;

window.onload = async () => {
    ///api/score/users/{userID} 
    const response = await fetch("http://localhost:80/api/score/users/ " + id);
    const scores = await response.json();
    var largest= 0;

    for(const score of scores){
        if (score.score>largest) {
            var largest=score.score;
        }
    }

    console.log(largest);

    document.getElementById("bestscore").innerHTML = "Melhor Pontuação: " + largest;

};