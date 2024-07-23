console.log("Trabajo de encriptado");

/** REGLA PARA ENCRIPTAR
La letra "e" es convertida para "enter"
La letra "i" es convertida para "imes"
La letra "a" es convertida para "ai"
La letra "o" es convertida para "ober"
La letra "u" es convertida para "ufat"
**/


// VARIABLES Y OBJETOS
let ingreso__textarea = document.getElementById('ingreso__textarea');
let button__copiar = document.getElementById('button__copiar');
let resultado__encriptado = document.getElementById('resultado__encriptado');
let textoATransformar = "";
// let textoTransformado = "";
// let resultadoBusqueda = "";
let texto = "";
// let arrayTexto = [];
// let arrayEncriptado = [];
let reglaParaEncriptar = {    
    "e":"enter",
    "i":"imes",
    "a":"ai",
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

// ENCRIPTAR EL TEXTO 

function encriptarTexto(){
    textoATransformar = valueHTML("ingreso__textarea");
    for (let clave in reglaParaEncriptar) {      
        let regex = new RegExp(clave, "g");
        textoATransformar = textoATransformar.replace(regex, reglaParaEncriptar[clave]);
    }
    mostrarResultado(textoATransformar);
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

    button__copiar.addEventListener('click', function() {
    texto = resultado__encriptado.textContent;

    navigator.clipboard.writeText(texto).then(function() {
        alert('Texto copiado al portapapeles');
    }).catch(function(error) {
        console.error('Error al copiar el texto: ', error);
    });

    ingreso__textarea.addEventListener('focus', function() {
        navigator.clipboard.readText().then(function(texto) {
            ingreso__textarea.value = texto;            
        }).catch(function(error) {
            console.error('Error al leer el texto del portapapeles: ', error);
        });
    });    

});


// VALIDAR QUE NO HAYA MAYUSCULAS NI ACENTOS

    ingreso__textarea.addEventListener('input', function(event) {
    const input = event.target;
    const errorDiv = document.getElementById('panel__ingreso__validacion');
    
    // Expresión regular para validar minúsculas y sin acentos
    const regex = /^[a-z\s]*$/;
    
    if (!regex.test(input.value)) {
        errorDiv.textContent = 'El texto solo debe contener letras minúsculas sin acentos.';
        errorDiv.style.color = 'red';
        displayHTML('button__encriptar', 'none');
        displayHTML('button__desencriptar', 'none');
    } else {
        errorDiv.textContent = 'Sólo letras en minúscula y sin acentos';
        input.style.backgroundColor = '';
        errorDiv.style.color = '';
        displayHTML('button__encriptar', 'inline');
        displayHTML('button__desencriptar', 'inline');
    }
});






/** 
MATERIAL PARA OTROS TRABAJOS - Pasar a un file de estudio

ENCRIPTA TEXTO - 
function encriptarTexto(){
    arrayEncriptado=[];
    textoATransformar = valueHTML("ingreso__textarea");
    
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
**/