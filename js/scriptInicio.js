
let instruccionesLeidas;

function verInstrucciones() {
    let cambiarInstrucciones;
    let cambiarInicio;
    let cambiarTaparJugar;
    let cambiarGiff;
    let cambiarSalir;
    instruccionesLeidas = true;

    cambiarSalir = document.getElementById ("salirJuego");
    cambiarGiff = document.getElementById ("giffInstrucciones");
    cambiarTaparJugar = document.getElementById ("taparJugar");
    cambiarInstrucciones = document.getElementById ("instrucciones");
    cambiarInicio = document.getElementById ("menuInicio");

    cambiarSalir.style.zIndex = "-30";
    cambiarGiff.style.zIndex = "10";
    cambiarTaparJugar.style.zIndex = "-20";
    cambiarInstrucciones.style.zIndex = "20";
    cambiarInicio.style.zIndex = "-20";
}

function volverInicio() {
    let cambiarInstrucciones;
    let cambiarInicio;
    let cambiarGiff;
    let cambiarSalir;

    cambiarSalir = document.getElementById ("salirJuego");
    cambiarGiff = document.getElementById ("giffInstrucciones");
    cambiarInstrucciones = document.getElementById ("instrucciones");
    cambiarInicio = document.getElementById ("menuInicio");

    cambiarSalir.style.zIndex = "30";
    cambiarGiff.style.zIndex = "-20";
    cambiarInstrucciones.style.zIndex = "-20";
    cambiarInicio.style.zIndex = "20";
}

function cambiarDificultad() {
    let cambiarDificultad1;
    let cambiarInicio;
    let cambiarTaparJugar;
    let cambiarSalir;

    cambiarSalir = document.getElementById ("salirJuego");
    cambiarTaparJugar = document.getElementById ("taparJugar");
    cambiarDificultad1 = document.getElementById ("menuDificultad");
    cambiarInicio = document.getElementById ("menuInicio");

    cambiarSalir.style.zIndex = "-30";
    cambiarTaparJugar.style.zIndex = "-25";
    cambiarDificultad1.style.zIndex = "20";
    cambiarInicio.style.zIndex = "-20";
}

function actualizarDificultad() {
    document.cookie = "dificultad=4";
    salirDificultad();
}

function actualizarDificultad2() {
    document.cookie = "dificultad=8";
    salirDificultad();
}

function actualizarDificultad3() {
    document.cookie = "dificultad=16";
    salirDificultad();
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function salirDificultad() {
    let cambiarDificultad;
    let cambiarInicio;
    let cambiarTaparJugar;
    let cambiarSalir;

    if (instruccionesLeidas == true) {
        cambiarTaparJugar = document.getElementById ("taparJugar");
        cambiarTaparJugar.style.zIndex = "-25";
    } else {
        cambiarTaparJugar = document.getElementById ("taparJugar");
        cambiarTaparJugar.style.zIndex = "25";
    }
    
    cambiarDificultad = document.getElementById ("menuDificultad");
    cambiarInicio = document.getElementById ("menuInicio");
    cambiarSalir = document.getElementById ("salirJuego");

    cambiarSalir.style.zIndex = "30";
    cambiarDificultad.style.zIndex = "-20";
    cambiarInicio.style.zIndex = "20";
}
