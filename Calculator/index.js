const screen     = document.getElementById('screen');
const results    = document.getElementById('result');
let   operand1   = 0;
let   operand2   = 0;
let   auxOperand = "";  
let   operand    = null;

function getResult(equal) {
    let partialResult; 
    
    if(equal && auxOperand.length > 0) {
        if(setNum() == 0) {
            return;
        }
    }

    switch (operand) {
        case 1:
            partialResult = operand1*operand2;
            break;
        case 2:
            partialResult = operand1 / operand2;
            break;
        case 3:
            partialResult = operand1 % operand2;
            break;
        case 4:
            partialResult = operand1 - operand2;
            break;
        case 5:
            partialResult = operand1 + operand2;
            break;
    }

    if (equal) {
        acFunc();
    } else{
        operand1 = partialResult;
        operand2 = 0;
    }
    if(Number.isNaN(partialResult) || typeof partialResult == undefined)
    {
        screen.innerText = "Syntax error";
        setTimeout(acFunc,3000);
        return 0;
    }

    results.innerText = `${partialResult}`;
}

function addNumber(param) {   
    auxOperand += param;
    screen.innerText += param;
}

function errorFunc(auxOperand) {
    let dotCounter = 0;

    for (let index = 0; index < auxOperand.length; index++) {
        const element = auxOperand[index];
        if(element === '.') {
            dotCounter++;
        }
        if(dotCounter > 2) {
            break;
        }
    }
    if(dotCounter < 2) {
        return 1;
    }
    screen.innerText = "Syntax error";
    setTimeout(acFunc,3000);
    return 0;
}

function setNum() {
    let partialResult;

    if(errorFunc(auxOperand) == 1) {
        partialResult = parseFloat(auxOperand);
    } else {
        return 0;
    }
    

    if(operand1 == 0) {
        operand1 = partialResult;
        auxOperand = "";
    }else if(operand2 == 0) {
        operand2 = partialResult;
        auxOperand = "";
    }else {
        getResult(false);
    }
    return 1;
}

function setOperation(operation) {
    setNum();
    switch (operation) {
        case '*':
            operand = 1;
            break;
        case '/':
            operand = 2;
            break;
        case '%':
            operand = 3;
            break;
        case '-':
            operand = 4;
            break;
        case '+':
            operand = 5;
            break;
    }
    screen.innerText += " " + operation + " ";

}

function delNumber() {
    const newText = screen.innerText;
    auxOperand = auxOperand.slice(0,-1);
    screen.innerText = newText.slice(0,-1);
}

function acFunc() {
    operand1   = 0;
    operand2   = 0;
    auxOperand = "";  
    operation = null;
    screen.innerText = ''
    results.innerText = '0'
}

function negFunction() {
    let partialResult;
    if(auxOperand.length != 0) {
        try {
            partialResult = parseFloat(auxOperand);
            partialResult *= (-1);
        } catch (error) {
            errorFunc();
            return;
        }
    }
    if (operand1 === 0) {
        operand1 = partialResult;
    }else {
        operand2 = partialResult;
    }
}