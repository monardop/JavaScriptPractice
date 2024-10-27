const rockBtn = document.getElementById("rock");
const paperBtn = document.getElementById("paper");
const scissorsBtn = document.getElementById("scissors");

const { piedra, papel, tijeras } = require('./elementosExtra')

function getRandom(max) {
    const jugada = ["papel", "piedra", "tijeras"];
    return jugada[Math.floor(Math.random() * max)];
  }
  

function play(counter) {
    computerMovement = getRandom();
    console.log(computerMovement)
    setTimeout(()=>{
        const resultArea = document.getElementById()
    },2000)


}


rockBtn.addEventListener('click', ()=>{
    play("papel")
});
paperBtn.addEventListener('click', ()=>{
    play("tijeras")
});
scissorsBtn.addEventListener('click', ()=>{
   play("piedra")
});




