console.log("Trabajo de encriptado");

/** 
La letra "e" es convertida para "enter"
La letra "i" es convertida para "imes"
La letra "a" es convertida para "ai"
La letra "o" es convertida para "ober"
La letra "u" es convertida para "ufat"
**/



// ENCRIPTAR EL TEXTO INGRESADO

let textoAEncriptar = "hola Andrea";
let arrayTexto = [];
let resultadoEncriptado = "";

function encriptarTexto(texto){
    arrayTexto = texto.split('');
    console.log(arrayTexto);
    return arrayTexto;
 }


 // MOSTRARLO EN EL PANEL DE RESULTADO

resultadoEncriptado = document.getElementById("resultado__encriptado");
resultadoEncriptado.innerHTML= "hola claudia";

   

// DESENCRIPTAR EL TEXTO 


// VALIDAR QUE NO HAYA MAYUSCULAS NI ACENTOS
