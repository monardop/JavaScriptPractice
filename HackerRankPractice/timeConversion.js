/*
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function timeConversion(s) {
    if(s.slice(8) === "PM" && s.slice(0,2) != "12") {
        let nuevoNumero = parseInt(s.slice(0,2));
        nuevoNumero += 12;
        const nuevaCadena = `${nuevoNumero}` + s.slice(2, 8); 
        return nuevaCadena;
    }
    if(s.slice(8) === "AM" && s.slice(0,2) === "12") {
        const nuevaCadena = "00" + s.slice(2, 8); 
        return nuevaCadena;
    } else {
        return s.slice(0,8);
    }
}

console.log(timeConversion("02:02:02PM"))
console.log(timeConversion("02:02:02AM"))
console.log(timeConversion("12:02:02AM"))