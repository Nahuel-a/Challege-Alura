const textArea = document.querySelector("textArea");
const btnCopiar = document.getElementById("btn-copiar");
const contenedorImg = document.getElementById("contenedor-derecha");
const contenedorEncriptador = document.getElementById("contenedor-encriptador");//
const areaTextoEncriptado = document.getElementById("texto-encriptado");
const mensajeCopiado = document.getElementById("mensaje-copiado");

const ventadaAvertencia = document.getElementById("ventana-advertencia");
const btnCerrar = document.getElementById("cerrar-ventana");

btnCopiar.addEventListener("click", function(){
    navigator.clipboard.writeText(areaTextoEncriptado.innerText);

    mensajeCopiado.style.display = "block";
    setTimeout(function(){
        mensajeCopiado.style.display = "none";
    }, 1500);
    
    textArea.value="";
});


textArea.addEventListener("input", function(){
    if(this.value === ""){
        areaTextoEncriptado.innerText = "";
        contenedorImg.style.display = "flex";
        contenedorEncriptador.style.display = "none";
    }
});

async function btnEncriptar(){
    let textoEncriptado = await validaciones(textArea.value);
    textoEncriptado = encriptar(textoEncriptado);
    
    if(textoEncriptado != ''){
        mostrarContenido();
        areaTextoEncriptado.innerText = textoEncriptado;
    }
}

async function btnDesencriptar(){
    let textoDesencriptado = await validaciones(textArea.value);
    textoDesencriptado = desencriptar(textoDesencriptado);
    if(textoDesencriptado != ''){
        mostrarContenido();
        areaTextoEncriptado.innerText = textoDesencriptado;
    }
}

function encriptar(stringEncriptado){
    
    stringEncriptado = stringEncriptado.replace(/e/gi, "enter")
            .replace(/i/gi,"imes" )
            .replace(/a/gi, "ai")
            .replace(/o/gi, "ober")
            .replace(/u/gi, "ufat"); 

    return stringEncriptado;
}

function desencriptar(stringDesencriptado){

    stringDesencriptado = stringDesencriptado.replace(/enter/gi, "e")
            .replace(/imes/gi,"i" )
            .replace(/ai/gi, "a")
            .replace(/ober/gi, "o")
            .replace(/ufat/gi, "u"); 

   return stringDesencriptado;
}

async function validaciones(encripDesencrip){
    let carecteresEspeciales = /[^a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]/g;
    
    encripDesencrip = encripDesencrip.toLowerCase();

    if (encripDesencrip === ""){
        alert("Debes de ingresar texto para Encriptar/Desencriptar");

    }else if(carecteresEspeciales.test(encripDesencrip)){
        ventadaAvertencia.classList.remove("hidden");

        await new Promise(resolve => {

            btnCerrar.addEventListener("click", async () => {
                ventadaAvertencia.classList.add("hidden");
                resolve();
            });
        });
        encripDesencrip = encripDesencrip.normalize("NFD")
        .replace(carecteresEspeciales,'');
    }

    return encripDesencrip;
}

function mostrarContenido(){
    contenedorImg.style.display = "none";
    contenedorEncriptador.style.display = "block";
}