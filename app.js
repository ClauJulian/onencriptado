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
let resultado__encriptado = document.getElementById('resultado__encriptado');
let button__copiar = document.getElementById('button__copiar');

let error__validacion = 'El texto solo debe contener letras minúsculas sin acentos.';
let msg__validacion = 'Sólo letras en minúscula y sin acentos';

let textoATransformar = "";
let texto = "";

let reglaParaEncriptar = {    
    "e":"enter",
    "i":"imes",
    "a":"ai",
    "o":"ober",
    "u":"ufat",      
}

// let textoTransformado = "";
// let resultadoBusqueda = "";
// let arrayTexto = [];
// let arrayEncriptado = [];

// GENERICAS

function innerHTML(id,texto){
    document.getElementById(id).innerHTML= texto;
};

function valueHTML(id){
    return value = document.getElementById(id).value;
};

function styleCSS(id,atributo,especificacion){
    document.getElementById(id).style[atributo] = especificacion;
}

// MOSTRAR RESULTADO Y CAMBIAR ELEMENTOS

function mostrarResultado(resultado){
    styleCSS("panel__resultado","justifyContent","space-between");
    styleCSS("resultado__imagen",'display','none');
    styleCSS("panel__resultado__mensaje",'display','none');
    styleCSS("button__copiar",'display', 'inline');
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
        button__copiar.style.backgroundColor="lightblue";
    }).catch(function(error) {
        console.error('Error al copiar el texto: ', error);
    });

    ingreso__textarea.addEventListener('focus', function() {
        navigator.clipboard.readText().then(function(texto) {
            ingreso__textarea.value = texto; 
            button__copiar.style.backgroundColor="";           
        }).catch(function(error) {
            console.error('Error al leer el texto del portapapeles: ', error);
        });
    });    

});


// VALIDAR QUE NO HAYA MAYUSCULAS NI ACENTOS

    ingreso__textarea.addEventListener('input', function(event) {
    const input = event.target;
    const errorDiv = document.getElementById('panel__ingreso__validacion');
    
    const regex = /^[a-z\s]*$/;
    
    if (!regex.test(input.value)) {
        errorDiv.textContent = error__validacion;
        errorDiv.style.color = 'red';
        styleCSS('button__encriptar','display','none');
        styleCSS('button__desencriptar','display','none');
    } else {
        errorDiv.textContent = msg__validacion;
        errorDiv.style.color = '';
        styleCSS('button__encriptar','display', 'inline');
        styleCSS('button__desencriptar','display', 'inline');
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