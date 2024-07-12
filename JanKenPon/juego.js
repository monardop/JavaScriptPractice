const rockBtn = document.getElementById("rock");
const paperBtn = document.getElementById("paper");
const scissorsBtn = document.getElementById("scissors");


function play(election){
    if (election==rock){
        setTimeout(function(){document.getElementById("resultado").innerHTML = '<img src="img/papel.svg">';}, 200);

    }if (election==paper) {
        setTimeout(function(){document.getElementById("resultado").innerHTML = '<img src="img/tijeras.svg">'}, 200);
    } if (election == scissors) {
        setTimeout(function(){document.getElementById("resultado").innerHTML = '<img src="img/piedra.svg">'},200);
    }
    setTimeout(function(){ document.getElementById('result').innerHTML = '<p>lol'},400);  
    setTimeout(function(){location.reload()},3000)
}

rockBtn.addEventListener('click', ()=>{
    play(rock)
});
paperBtn.addEventListener('click', ()=>{
    play(paper)
});
scissorsBtn.addEventListener('click', ()=>{
   play(scissors)
});




