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
let texto = "";
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
};

function displayHTML(id, especificacion){
    document.getElementById(id).style.display = especificacion;
};

// MOSTRAR RESULTADO Y CAMBIAR ELEMENTOS

function mostrarResultado(resultado){
    displayHTML("resultado__imagen",'none');
    displayHTML("panel__resultado__mensaje",'none');
    displayHTML("button__copiar", 'inline');
    innerHTML("resultado__encriptado",resultado);
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
    mostrarResultado(resultadoBusqueda);
 }

   
// DESENCRIPTAR EL TEXTO 

function desencriptarTexto(){
    textoATransformar = valueHTML("ingreso__textarea");
        for (let letra in reglaParaEncriptar) {
            let clave = reglaParaEncriptar[letra];
            let regex = new RegExp(clave, "g");       
            textoATransformar = textoATransformar.replace(regex, letra);
        }
    
    mostrarResultado(textoATransformar);
};


// API CLIPBOARD

document.getElementById('button__copiar').addEventListener('click', function() {
    texto = document.getElementById('resultado__encriptado').textContent;

    navigator.clipboard.writeText(texto).then(function() {
        alert('Texto copiado al portapapeles');
    }).catch(function(error) {
        console.error('Error al copiar el texto: ', error);
    });

    document.getElementById('ingreso__textarea').addEventListener('focus', function() {
        navigator.clipboard.readText().then(function(texto) {
            document.getElementById('ingreso__textarea').value = texto;            
        }).catch(function(error) {
            console.error('Error al leer el texto del portapapeles: ', error);
        });
    });    

});


// VALIDAR QUE NO HAYA MAYUSCULAS NI ACENTOS
