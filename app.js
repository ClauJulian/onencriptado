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
    innerHTML("resultado__encriptado",resultado);

}
/**  FUNCIONES DE ESTILO DE BOX DE VALIDACION */
function activaEstiloValidacion(){
    styleCSS('panel__ingreso__validacion','backgroundColor','rgba(18, 20, 131, 0.8)');
    styleCSS('panel__ingreso__validacion','border','2px solid #0d0937');
    styleCSS('panel__ingreso__validacion','borderRadius','1.5rem');
    styleCSS('panel__ingreso__validacion','boxShadow','3px 3px 5px rgba(0, 0, 0, 0.3)');
    styleCSS('panel__ingreso__validacion','fontWeight','bold');
    styleCSS('panel__ingreso__validacion','fontSize','1.5rem');
    styleCSS('panel__ingreso__validacion','padding','0.5rem');
    styleCSS('panel__ingreso__validacion','color','red');
    styleCSS('button__encriptar','display','none');
    styleCSS('button__desencriptar','display','none');
}
function desactivaEstiloValidacion(){
    styleCSS('panel__ingreso__validacion','backgroundColor','');
    styleCSS('panel__ingreso__validacion','border','');
    styleCSS('panel__ingreso__validacion','borderRadius','');
    styleCSS('panel__ingreso__validacion','boxShadow','');
    styleCSS('panel__ingreso__validacion','fontWeight','');
    styleCSS('panel__ingreso__validacion','fontSize','');
    styleCSS('panel__ingreso__validacion','padding','');
    styleCSS('panel__ingreso__validacion','color','');
    styleCSS('button__encriptar','display', 'inline');
    styleCSS('button__desencriptar','display', 'inline');
}

// FUNCION BORRADO Y REINICIADO

function refreshTexto(){
    ingreso__textarea.value = '';
    resultado__encriptado.innerHTML = 'Ningún mensaje fue encontrado'; 
    styleCSS("resultado__imagen",'display','inline');
    styleCSS("panel__resultado","justifyContent","center");
    styleCSS("panel__resultado__mensaje",'display','inline');
    styleCSS("button__copiar",'display', 'none');
    styleCSS("icon__refresh",'display', 'none');
    clearClipboard();
}

// BORRADO DEL CLIPBOARD

async function clearClipboard() {
    try {
        await navigator.clipboard.writeText('');
        console.log('Portapapeles borrado.');
    } catch (err) {
        console.error('Error al borrar el portapapeles: ', err);
    }
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
    const errorDiv = document.getElementById('panel__ingreso__validacion');
    
    const regex = /^[a-zñ\s]*$/;
    
    if (!regex.test(input.value)) {
        errorDiv.textContent = error__validacion;
        activaEstiloValidacion();
    } else {
        errorDiv.innerHTML = '<span class="material-symbols-outlined">info</span>'+ msg__validacion;
        desactivaEstiloValidacion();
    }
});



