const ingreso = document.getElementById("dineroInicial");
const egreso = document.getElementById("gastos");
const gTotal = document.getElementById("totalGastado");


ingreso.addEventListener('click', dineroInicial);
egreso.addEventListener('click', gasto);
gTotal.addEventListener('click', totalGastado);

function dineroInicial(){
    let presupuesto = parseInt(document.getElementById("ingreso").value);
    
    if(presupuesto>0){
        document.getElementById("empezo").innerHTML = presupuesto;
    } else {
        alert("Dato inválido")
    }

    return presupuesto;
}

function gasto(gastoInd){
    gastoInd = parseInt(document.getElementById("gasto").value);
    if(gastoInd>0){
        document.getElementById("gastaste").innerHTML = gastoInd;
        gastoGen = parseInt(document.getElementById("gastaste"));   
    } else {
        alert("Dato inválido")
    }
    return gastoGen
}

var datoInicial = parseInt(presupuesto)

function totalGastado () {
    const total = presupuesto - gastoGen;
    document.getElementById("quedo").innerHTML = total;
}






