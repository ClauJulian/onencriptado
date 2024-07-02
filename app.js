console.log("Trabajo de encriptado");

/** REGLA PARA ENCRIPTAR
La letra "e" es convertida para "enter"
La letra "i" es convertida para "imes"
La letra "a" es convertida para "ai"
La letra "o" es convertida para "ober"
La letra "u" es convertida para "ufat"
**/




let textoATransformar = "";
let resultadoBusqueda = "";
let arrayTexto = [];
let arrayEncriptado = [];
let reglaParaEncriptar = {
    "a":"ai",
    "e":"enter",
    "i":"imes",
    "o":"ober",
    "u":"ufat",
}

// GENERICAS

function innerHTML(id,texto){
    document.getElementById(id).innerHTML= texto;
};

function valueHTML(id){
    return value = document.getElementById(id).value;
}


// ENCRIPTA TEXTO
function encriptarTexto(){
    textoATransformar = valueHTML("ingreso__textarea");;
    arrayTexto = textoATransformar.split('');

    for(let i = 0; i < arrayTexto.length; i++) {
        if (reglaParaEncriptar.hasOwnProperty(arrayTexto[i])){
            arrayEncriptado.push(reglaParaEncriptar[arrayTexto[i]]);
        }else{
            arrayEncriptado.push(arrayTexto[i]);
        }
    };    
    resultadoBusqueda = arrayEncriptado.join('');
    innerHTML("resultado__encriptado",resultadoBusqueda);
 }

   
// DESENCRIPTAR EL TEXTO 

function desencriptarTexto(){
    textoATransformar = valueHTML("ingreso__textarea");

    for (let letra in reglaParaEncriptar) {
        let clave = reglaParaEncriptar[letra];
        let regex = new RegExp(clave, "g");       
        textoATransformar = textoATransformar.replace(regex, letra);
    }
     
    innerHTML("resultado__encriptado", textoATransformar);
};


// API portapapeles
// VALIDAR QUE NO HAYA MAYUSCULAS NI ACENTOS
