const root = document.getElementById('mainSection');

let filteredQuestion;
let currentQuestionIndex = 0;
let timer;


let questions, levels, timeSelected; 

// ScorePoints
let score = 0, correct = 0, incorrect = 0, timeout = 0;

const getQuestions = async () => {
    try {
        const questionsPure  = await fetch('./questions.json');
        if(! questionsPure.ok) throw new Error("El archivo de preguntas no fue encontrado.");
        const questionsJSON = await questionsPure.json(); 
        
        questions = questionsJSON.preguntas;
        levels = questionsJSON.nivel;
    } catch (error) {
        console.warn(error.message);
    }   
}

const shuffleArray = (array) => {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const renderGameOver = () => {
    root.innerHTML = `
    <div class="question-container">
        <h2>Resultados</h2>
        <div class="score">
            <div class="left">
                <p>Respuestas correctas</p>
                <p>Respuestas incorrectas</p>
                <p>Tiempo finalizado</p>
                <h4 class="score-final">Puntaje final</h4>
            </div>
            <div class="right">
                <p>${correct}</p>
                <p>${incorrect}</p>
                <p>${timeout}</p>
                <h4 class="score-final">${score}</h4>
            </div>
        </div>
    </div>
    <div class="option" onclick="initialize()"><p>Volver a empezar</p></div>
    `
}

const filterQuestions = (question, lvl) => {
    let newArray = [];
    let i = 0;
    while(i < questions.length){
        if (question[i].dificultad === lvl) {
            newArray.push(question[i])
        }
        i++;
    }

    while (newArray.length > 10) {
        newArray.pop();
    }

    return newArray;
} 

const handleAnswer = points => {
    clearTimeout(timer);
    switch (points) {
        case -1:
            incorrect++;
            break;
        case 1:
            correct++;
            break;
        case 0:
            timeout++;
            break;
    }
    score += points;
   
    renderNextQuestion();
}

const startTimer = timeLeft => {
    const timerElement = `<div class="timer"><p id="timer">${timeSelected}s</p></div>`
    root.innerHTML += timerElement;
    const timerScreen = document.getElementById("timer");
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timerScreen.innerText = `${timeLeft--}s`;
      } else {
        clearInterval(timer);
        handleAnswer(0); 
      }
    }, 1000);
}
  
const createQuestion = question => {   
    let ans = []

    const ranNum = Math.floor(Math.random() * 3);
    switch (ranNum) {
        case 0:
            ans = [[1, question.respuesta_correcta], [-1, question.respuesta2],
                    [-1, question.respuesta3], [-1, question.respuesta4]];
            break;

        case 1:
            ans = [[-1, question.respuesta2], [1, question.respuesta_correcta],
                    [-1, question.respuesta3], [-1, question.respuesta4]];
            break;

        case 2:
            ans = [[-1, question.respuesta4],[1, question.respuesta_correcta], 
                    [-1, question.respuesta3],  [-1, question.respuesta2]];
            break;

        default:
            ans = [[-1, question.respuesta3], [-1, question.respuesta2], 
                [1, question.respuesta_correcta], [-1, question.respuesta4]];
            break;
    }
    
    root.innerHTML = `
    <div class="question-container container">
        <div class="question-box">
            <span class="question-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4" />
                    <path d="M12 19l0 .01" />
                </svg>
            </span>
            <h3>${question.pregunta} </h3>
        </div>
        <div onclick="handleAnswer(${ans[0][0]})" class="option">${ans[0][1]} </div>
        <div onclick="handleAnswer(${ans[1][0]})" class="option">${ans[1][1]} </div>
        <div onclick="handleAnswer(${ans[2][0]})" class="option">${ans[2][1]} </div>
        <div onclick="handleAnswer(${ans[3][0]})" class="option">${ans[3][1]} </div>
    </div>`
    startTimer(timeSelected);    
}

const renderNextQuestion = () => {
    if (currentQuestionIndex >= filteredQuestion.length) {
      renderGameOver();
      return;
    }
    const question = filteredQuestion[currentQuestionIndex];
    createQuestion(question);
    currentQuestionIndex++;
}

const startGame = (lvl) => {
    timeSelected = levels[lvl-1].tiempo_respuesta;
    filteredQuestion = filterQuestions(questions, lvl);
    shuffleArray(filteredQuestion);

    root.innerHTML = "";

    renderNextQuestion();
}

const principalScreen = (difficulty) => {
    const menu = `<div class="question-container container">
                    <div class="presentation">
                        <div class="bg-1">
                            <h1 class="t-stroke t-shadow">Bienvenidos a <br/> ¿Quién quiere ser millonario?</h1>
                        </div>
                    </div>
                    <div class="difficultSelect">
                        <div class="option" onclick="startGame(1)">
                            <p><strong>${difficulty[0].nombre}</strong>Dispones de ${difficulty[0].tiempo_respuesta}s con preguntas sencillas</p>
                        </div>
                        <div class="option" onclick="startGame(2)">
                            <p><strong>${difficulty[1].nombre}</strong>Dispones de ${difficulty[1].tiempo_respuesta}s con preguntas interesantes</p>
                        </div>
                        <div class="option" onclick="startGame(3)">
                            <p><strong>${difficulty[2].nombre}</strong>Dispones de ${difficulty[2].tiempo_respuesta}s con preguntas complicadas</p>
                        </div>
                    </div>
                </div>`;
    root.innerHTML = menu;
}      
          
async function initialize() {
    // seteo los valores para el reinicio
    currentQuestionIndex = 0;
    score = 0, correct = 0, incorrect = 0, timeout = 0;

    await getQuestions();
    principalScreen(levels);
}

initialize();