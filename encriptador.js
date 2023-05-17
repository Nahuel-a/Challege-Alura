const entradaTexto = document.querySelector("textArea");
const btnCopiar = document.getElementById("btn-copiar");
const contenedorImg = document.getElementById("contenedor-derecha");
const contenedorEncriptador = document.getElementById("contenedor-encriptador");//
const areaTextoEncriptado = document.getElementById("texto-encriptado");
const mensajeCopiado = document.getElementById("mensaje-copiado");
const ventanaAdvertencia1 = document.getElementById("ventana-advertencia1");
const btnCerrar = document.getElementById("cerrar-ventana");
const ventanaAdvertencia2 = document.getElementById("ventana-advertencia2");
const caracteresEspeciales = /[^a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]/g;

btnCopiar.addEventListener("click", () => {
    navigator.clipboard.writeText(areaTextoEncriptado.innerText);

    mensajeCopiado.style.display = "block";
    setTimeout(() => mensajeCopiado.style.display = "none", 1000);
    entradaTexto.value="";
});

entradaTexto.addEventListener("input", function() {
    if(this.value === ""){
        areaTextoEncriptado.innerText = "";
        contenedorImg.style.display = "flex";
        contenedorEncriptador.style.display = "none";
    }
});

async function btnEncriptar(){
    try {
        const textoEncriptado = await validarTexto(entradaTexto.value);
        mostrarContenido();
        areaTextoEncriptado.innerText = encriptarTexto(textoEncriptado);

    } catch (error) {
        mostrarError();
    }
}

async function btnDesencriptar(){
    try {
        const textoDesencriptado = await validarTexto(entradaTexto.value);
        mostrarContenido();
        areaTextoEncriptado.innerText = desencriptarTexto(textoDesencriptado);

    } catch (error) {
        mostrarError();
    }
}

function encriptarTexto(textoEncriptado){
    return textoEncriptado.replace(/e/gi, "enter")
        .replace(/i/gi,"imes" )
        .replace(/a/gi, "ai")
        .replace(/o/gi, "ober")
        .replace(/u/gi, "ufat"); 
}

function desencriptarTexto(textoDesencriptado){
    return textoDesencriptado.replace(/enter/gi, "e")
        .replace(/imes/gi,"i" )
        .replace(/ai/gi, "a")
        .replace(/ober/gi, "o")
        .replace(/ufat/gi, "u");
}

async function validarTexto(encripDesencrip){    
    encripDesencrip = encripDesencrip.toLowerCase();
    
    if (encripDesencrip === ""){
        return Promise.reject();
    }

    if(caracteresEspeciales.test(encripDesencrip)){
        ventanaAdvertencia1.classList.remove("hidden");

        return new Promise((resolve) => {
            btnCerrar.addEventListener("click", () => {
                ventanaAdvertencia1.classList.add("hidden");
                resolve(encripDesencrip.normalize("NFD").replace(caracteresEspeciales,''));
            });
        });
    }
    return Promise.resolve(encripDesencrip);
}

function mostrarContenido(){
    contenedorImg.style.display = "none";
    contenedorEncriptador.style.display = "block";
}

function mostrarError(){
    ventanaAdvertencia2.classList.remove("hidden");
    setTimeout(() => {
       ventanaAdvertencia2.classList.add("hidden");
    }, 1500);
}