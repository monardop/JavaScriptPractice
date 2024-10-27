const rockBtn = document.getElementById("rock");
const paperBtn = document.getElementById("paper");
const scissorsBtn = document.getElementById("scissors");

const seccionGanador = document.getElementById('ganador');
const seccionUsuario = document.getElementById('usuario');
const seccionComputadora = document.getElementById('compu');
const seccionPuntaje = document.getElementById('puntaje')


const piedra = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-hand-grab"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 11v-3.5a1.5 1.5 0 0 1 3 0v2.5" /><path d="M11 9.5v-3a1.5 1.5 0 0 1 3 0v3.5" /><path d="M14 7.5a1.5 1.5 0 0 1 3 0v2.5" /><path d="M17 9.5a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7l-.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47" /></svg>'
const papel = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-hand-stop"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 13v-7.5a1.5 1.5 0 0 1 3 0v6.5" /><path d="M11 5.5v-2a1.5 1.5 0 1 1 3 0v8.5" /><path d="M14 5.5a1.5 1.5 0 0 1 3 0v6.5" /><path d="M17 7.5a1.5 1.5 0 0 1 3 0v8.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7a69.74 69.74 0 0 1 -.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47" /></svg>'
const tijeras = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-hand-two-fingers"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 13v-8.5a1.5 1.5 0 0 1 3 0v7.5" /><path d="M17 11.5a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7a69.74 69.74 0 0 1 -.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47" /><path d="M14 10.5a1.5 1.5 0 0 1 3 0v1.5" /><path d="M11 5.5v-2a1.5 1.5 0 1 1 3 0v8.5" /></svg>'

let userPoints = 0, compPoints = 0;
let juegoEnProceso = false;

function createHTMLElement(element) {
    let svgElement;

    switch (element) {
        case "piedra":
            svgElement = piedra;
            break;
        case "tijeras":
            svgElement = tijeras;
            break;
        default:
            svgElement = papel;
            break;
    }

    return `<div class="boton boton-${element}">${svgElement}</div>`
}


function getRandom() {
    const jugada = ["papel", "piedra", "tijeras"];
    return jugada[Math.floor(Math.random() * 3)];
}

function winnerObserver() {
    if (userPoints === 3) {
        seccionGanador.className = "ganador"
        seccionGanador.innerHTML = "El ganador es usted";
        userPoints = 0, compPoints = 0;
        return true;
    } else if(compPoints === 3) {
        seccionGanador.className = "perdedor"
        seccionGanador.innerHTML = "Perdiste :C";
        userPoints = 0, compPoints = 0;
        return true;
    }
    
    return false;
}

function clearWindow(timer) {
    setTimeout( () => {
        seccionPuntaje.innerHTML = `${userPoints} - ${compPoints}`
        seccionComputadora.innerHTML = "";
        seccionGanador.innerHTML = "";
        seccionUsuario.innerHTML = "";
        seccionGanador.className = "";
        juegoEnProceso = false;
    }, timer);
}

function winner(user, counter) {
    let isWinner;
    const play = (counter) => {
        const computerMovement = getRandom();
        setTimeout(()=>{
            seccionComputadora.innerHTML = createHTMLElement(computerMovement);
        }, 1500);
         
        return computerMovement;
    }
    const computerMovement = play(counter);
    
    setTimeout(() => {
        if (counter === computerMovement) {
            seccionGanador.innerHTML = "Punto para la máquina";
            compPoints++;
        } else if(computerMovement === user){
            seccionGanador.innerHTML = "Empate";
        }else {
            seccionGanador.innerHTML = "Punto para vos";
            userPoints++;
        };
        
        isWinner = winnerObserver();
        
    }, 2000);
    isWinner ? clearWindow(5000) : clearWindow(3500);
}   

rockBtn.addEventListener('click', ()=>{
    if(!juegoEnProceso) {
        juegoEnProceso = true;
        seccionUsuario.innerHTML = createHTMLElement("piedra");
        winner("piedra", "papel");
    }
});

paperBtn.addEventListener('click', ()=>{
    if(!juegoEnProceso) {
        juegoEnProceso = true;
        seccionUsuario.innerHTML = createHTMLElement("papel");
        winner("papel", "tijeras");
    }
});

scissorsBtn.addEventListener('click', ()=>{
    if(!juegoEnProceso) {
        juegoEnProceso = true;
        seccionUsuario.innerHTML = createHTMLElement("tijeras");
        winner("tijeras", "piedra");
    }
});




