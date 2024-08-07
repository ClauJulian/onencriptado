//console.log("Trabajo de encriptado");


/**  VARIABLES Y OBJETOS */
let ingreso__textarea = document.getElementById('ingreso__textarea');
let resultado__encriptado = document.getElementById('resultado__encriptado');
let button__copiar = document.getElementById('button__copiar');
let ingreso__refresh = document.getElementById('ingreso__refresh');

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

/** FUNCIONES UTILES */
function innerHTML(id,texto){
    document.getElementById(id).innerHTML= texto;
};

function valueHTML(id){
    return value = document.getElementById(id).value;
};

function styleCSS(id,atributo,especificacion){
    document.getElementById(id).style[atributo] = especificacion;
}

/**  FUNCIONES PARA MOSTRAR RESULTADO Y CAMBIAR ELEMENTOS */
function mostrarResultado(resultado){
    styleCSS("panel__resultado","justifyContent","space-between");
    styleCSS("resultado__imagen",'display','none');
    styleCSS("panel__resultado__mensaje",'display','none');
    styleCSS("button__copiar",'display', 'inline');
    styleCSS("icon__refresh",'display', 'inline');
    styleCSS("resultado__encriptado",'color', 'var(--color--texto--panel)');
    innerHTML("resultado__encriptado",resultado);

}
/**  FUNCIONES DE ESTILO DE BOX DE VALIDACION */
function activaValidacion(){
    styleCSS('panel__ingreso__botonera','display','none');
    styleCSS('validacion__box','display','inline');
}
function desactivaValidacion(){
    styleCSS('panel__ingreso__botonera','display','flex');
    styleCSS('validacion__box','display','none');
}

// FUNCION REINICIAR APP

function refreshTexto(){
    location.reload();
}



/** DESARROLLO DE ENCRIPTADOR DE TEXTO */

// ENCRIPTAR EL TEXTO 

function encriptarTexto(){
    textoATransformar = valueHTML("ingreso__textarea");
    if(textoATransformar){
        for (let clave in reglaParaEncriptar) {      
            let regex = new RegExp(clave, "g");
            textoATransformar = textoATransformar.replace(regex, reglaParaEncriptar[clave]);
        }
        mostrarResultado(textoATransformar);
    }
}
   
// DESENCRIPTAR EL TEXTO 

function desencriptarTexto(){
    textoATransformar = valueHTML("ingreso__textarea");
    if(textoATransformar){
        for (let letra in reglaParaEncriptar) {
            let clave = reglaParaEncriptar[letra];
            let regex = new RegExp(clave, "g");       
            textoATransformar = textoATransformar.replace(regex, letra);
        }    
    mostrarResultado(textoATransformar);
    }
};

// REFRESH TEXTO
icon__refresh.addEventListener('click', refreshTexto);


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
            innerHTML("resultado__encriptado", "");         
        }).catch(function(error) {
            console.error('Error al leer el texto del portapapeles: ', error);
        });
    });    

});


// VALIDAR QUE NO HAYA MAYUSCULAS NI ACENTOS

    ingreso__textarea.addEventListener('input', function(event) {
    const input = event.target;
    
    const regex = /^[a-zñ\s]*$/;
    
    if (!regex.test(input.value)) {
        activaValidacion();
    } else {
        desactivaValidacion();
    }
});



