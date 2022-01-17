
// let pimpam = ($_SESSION["dificultad"]);

let imgCorrerIzq = 0;
let imgCorrerDer = 0;
let imgEstatica = 0;
let gameOver = false;
let puntuacionObtenida = 0;
let contadorInactividad = 0;
let contadorMovimientos = 0;
//teclas: ESPACIO = 0, IZQ = 1, ARRIBA = 2, DERECHA = 3, ABAJO = 4.
let teclaPresionada = [];
let pisoActual = 0;
let teclado;
let teclado1;
let tiempoAcabado;
let tiempoRestante;
let altura = 150;
let posicionIzquierda1 = 1125;
let posicionIzquierda;
let pergamino = []; //0 = DAM, 1 = DAW, 2 = SMX, 3 = ACTIVITATS COMERCIALS, 4 = MARQUETING I PUBLICIDAD, 5 = administracio y finances, 6 = agencia viatges, 
// 7 = assistencia a la direccio, 8 = comerc internacional,  9 = gestio administrativa, 10 = gestio de vendes 
let dentroHabitacion;
let contador = 0;
let ejectuarPrograma; //ejectua el interval de la funcion de movimiento
let ejectuarPrograma2; //ejecuta el interval del cronometro
let ejectuarPrograma3; //ejecuta el interval de si el jugador ha ganado o no
let ejecutarPrograma4; //ejecuta el interval del scroll de pantalla
let ejectuarLanzarLadrillos; //ejecuta  el interval de lanzar ladrillos
let programa; //mira que los interval solo se ejecuten una vez
let programaCronometro; //mira que el cronometro solo se ejecute una vez
let lanzarLadrillo; // mira que el interval de lanzar ladrillos solo se ejecute una vez
let contadorPergamino = 0;
let numPergamino;
let rutaPergamino;
let botonGrua = false;
let ladrillo0 = document.getElementById ("ladrillo0");
let ladrillo1 = document.getElementById ("ladrillo1");
let ladrillo2 = document.getElementById ("ladrillo2");
let ladrillo3 = document.getElementById ("ladrillo3");
let ladrillo4 = document.getElementById ("ladrillo4");
let ladrillo5 = document.getElementById ("ladrillo5");
let ladrillo6 = document.getElementById ("ladrillo6");
let ladrillo7 = document.getElementById ("ladrillo7");
let ladrillo8 = document.getElementById ("ladrillo8");
let ladrillo9 = document.getElementById ("ladrillo9");
let ladrillo10 = document.getElementById ("ladrillo10");
let ladrillo11 = document.getElementById ("ladrillo11");
let ladrillo12 = document.getElementById ("ladrillo12");
let ladrillo13 = document.getElementById ("ladrillo13");
let ladrillo14 = document.getElementById ("ladrillo14");
let ladrillo15 = document.getElementById ("ladrillo15");
let alturaLadrillo = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let enCaida = [];
let colisionAltura1; //comprueba la colision con los ladrillos del jugador
let colisionAltura2;
let colisionAnchura1;
let colisionAnchura2;
let posicionJugadorAltura; //comprueba la posicion del jugador para la colision de los ladrillos
let posicionJugadorAnchura;
let cronometro1;
let min; //valores del cronometro
let sec;
let parpadeoContador;

// const audio = new Audio('./../audio/sonidoTrafico.mp3');
// const trafico = new Audio('/audio/sonidoTrafico.mp3');
// trafico.play();

// var x = document.getElementById("audioTrafico");
// x.play();

const sonidoTrafico = new Audio('./audio/sonidotrafico.mp3');
const saltoSonido = new Audio('./audio/salto.mp3');
const botonSonido = new Audio('./audio/boton.mp3');
const pergaminoSonido = new Audio('./audio/cogerPergamino.mp3');
const ganarSonido = new Audio('./audio/ganar.mp3');
const parpadeoSonido = new Audio('./audio/parpadeoPergamino1.mp3');
const pasosSonido = new Audio('./audio/pasos11.mp3');
const puertaSonido = new Audio('./audio/puertaAbierta.mp3');
const perderSonido = new Audio('./audio/perder.mp3');
const gruaSonido = new Audio('./audio/grua.mp3');
const impactoSonido = new Audio('./audio/impactoLadrillo1.mp3');

window.addEventListener("keydown", function(event){
    if (event.keyCode == 32 || event.keyCode == 38){
        event.preventDefault();
    }
}, false);

 window.addEventListener('keydown', teclasAbajo);
 window.addEventListener('keyup', teclasArriba);

document.getElementById("jugador").style.bottom = altura + 'px'; //150 el minimo
document.getElementById("jugador").style.left = posicionIzquierda1 + 'px'; //0 el minimo, 1125 inicio i final 1350

window.scroll({ top: 2280, behavior:"smooth" }); //mueve el scroll abajo del todo namas empezar

// var dificultad = getCookie( "dificultad" );
var dificultad = 8;


if (dificultad == 16) {  //cambia el tiempo segun la dificultad
    min = 1;
    sec = 10; //70 * 14 == 980  
} else if (dificultad == 8) { 
    min = 1;    // 90 * 11 == 990
    sec = 30;
} else {
    dificultad = 4; 
    min = 1;
    sec = 50; //110 * 9 == 990
} 



function readCookie(name) {

    var nameEQ = name + "="; 
    var ca = document.cookie.split(';');
  
    for(var i=0;i < ca.length;i++) {
  
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) {
        return decodeURIComponent( c.substring(nameEQ.length,c.length) );
      }
  
    }
  
    return null;
  
}


function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}


function programa3() { //Activa el cronometro de forma que solo se active una vez
    if (programaCronometro == true) {
    }else if (programaCronometro == null || programaCronometro == false){
        ejectuarPrograma2 = setInterval(iniciarCrono, 1000);
        programaCronometro = true;
    }
}

function programa1() { 
    if (programa == true) {
        
    }else if (programa == null || programa == false){
        ejectuarPrograma = setInterval(moverse, 30);
        ejectuarPrograma3 = setInterval(partidaGanada, 500);
        ejecutarPrograma4 = setInterval(scrollPantalla, 200);
        programa = true;
    }
    
}

function programa2() {
    if (lanzarLadrillo == true && gameOver == false) {    
    }else if (lanzarLadrillo == null || lanzarLadrillo == false){
        ejectuarLanzarLadrillos = setInterval(lanzarLadrillos, 400);
        lanzarLadrillo = true;
    }
}

function scrollPantalla(){ //mueve el scroll segun el piso en el que este el jugador
    
    if (pisoActual == 0) { 
        // window.scroll( 0, 2400);
        window.scroll({ top: 2280, behavior:"smooth" });
    } else if (pisoActual == 1) {
        window.scroll({ top: 1960, behavior:"smooth" });
    } else if (pisoActual == 2) {
        window.scroll({ top: 1700, behavior:"smooth" });
    }else if (pisoActual == 3) {
        window.scrollTo({ top: 1500, behavior:"smooth" });
    }else if (pisoActual == 4) {
        window.scrollTo({ top: 1260, behavior:"smooth" });
    }else if (pisoActual == 5) {
        window.scrollTo({ top: 1060, behavior:"smooth" });
    }else if (pisoActual == 6) {
        window.scrollTo({ top: 800, behavior:"smooth" });
    }else if (pisoActual == 7) {
        window.scrollTo({ top: 500, behavior:"smooth" });
    }else if (pisoActual == 8) {
        window.scrollTo({ top: 400, behavior:"smooth" });
    }else if (pisoActual == 9) {
        window.scrollTo({ top: 270, behavior:"smooth" });
    }
}

function iniciarCrono(){ //cronometro
    
    if(min != 0 || sec != 0){
        contadorInactividad++;
        sec = sec - 1;
        if(sec == -1){
            sec = 59;
            min = min - 1;
            if(min <= 9){
                document.getElementById('mostrarContador').innerHTML = '0' + min + ':' + sec;
            }else{
                document.getElementById('mostrarContador').innerHTML = min + ':' + sec;
            }
        }else if(sec <=9 && min <=9){
            document.getElementById('mostrarContador').innerHTML = '0' + min + ':0' + sec;       
        }else if(sec <=9){
            document.getElementById('mostrarContador').innerHTML = min + ':0' + sec;
        }else if(min <= 9){
            document.getElementById('mostrarContador').innerHTML = '0' + min + ':' + sec;     
        }else{
            document.getElementById('mostrarContador').innerHTML = min + ':' + sec;
        }
    }else if(min == 0 && sec == 0){
            gameOver = true;
            tiempoAcabado = true;
            posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/muerto1.png)";
            clearInterval(ejectuarLanzarLadrillos);
            setTimeout(function(muerto){
                posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/muerto2.png)";
                posicionJugador.style.width = "130px";
                finPartida();
                
            }, 300);
        if(parpadeoContador == true){
            document.getElementById('mostrarContador').innerHTML = '0' + min + ':0' + sec;
            parpadeoContador = false;
        }else{
            document.getElementById('mostrarContador').innerHTML = '';
            parpadeoContador = true;
        }
    }
    puntuacionObtenida = puntuacionObtenida + 1;
    
}

function teclasAbajo(){ //comprueba las teclas presionadas y las combierte en true
    teclado = event.keyCode

    if(teclado == 32){
        teclaPresionada[0] = true; //espacio
    }else if(teclado == 37){
        teclaPresionada[1] = true; //izquierda
    }else if(teclado == 38){  
        teclaPresionada[2] = true; //arriba
    }else if(teclado == 39){
        teclaPresionada[3] = true; //derecha
    }else if(teclado == 40){
        teclaPresionada[4] = true; //abajo
    }else{}

    programa1();
    programa2();
    programa3();
}

function teclasArriba(){ //comprueba las teclas que se han dejado de presionar y las deja en false
    teclado1 = event.keyCode

    if(teclado1 == 32){
        teclaPresionada[0] = false; //espacio
    }else if(teclado1 == 37){
        teclaPresionada[1] = false; //izquierda
    }else if(teclado1 == 38){
        teclaPresionada[2] = false; //arriba
    }else if(teclado1 == 39){
        teclaPresionada[3] = false; //derecha
    }else if(teclado1 == 40){
        teclaPresionada[4] = false;//abajo
    }else{}
}

function lanzarLadrillos() {
    

    let numAleatorio = [];
    let numAleatorioVelocidad = [];
  
    let ladrillo0Repeticion;
    let ladrillo1Repeticion;
    let ladrillo2Repeticion;
    let ladrillo3Repeticion;
    let ladrillo4Repeticion;
    let ladrillo5Repeticion;
    let ladrillo6Repeticion;
    let ladrillo7Repeticion;
    let ladrillo8Repeticion;
    let ladrillo9Repeticion;
    let ladrillo10Repeticion;
    let ladrillo11Repeticion;
    let ladrillo12Repeticion;
    let ladrillo13Repeticion;
    let ladrillo14Repeticion;
    let ladrillo15Repeticion;

    for (let i = 0; i < dificultad; i++) { //asigna una posicion horitzontal aleatoria y un rango de velocidad de caida aleatoria para cada ladrillo
        numAleatorio[i] = Math.floor(Math.random() * (1350 - 220)) + 220;
        numAleatorioVelocidad[i] = Math.floor(Math.random() * 15) + 7;
    }

    //esta puesto de esta manera porque al ser velocidades aleatorias se van ejecuntado todos los ladrillos que ya han tocado suelo sin esperar aque lleguen los otros.
    //de esta forma se convierte mas aleatorio la caida de cada ladrillo

    if (dificultad == 4 || dificultad == 8 || dificultad == 16) {
        if (enCaida[0] == null || enCaida[0] == false) {
            ladrillo0.style.left = numAleatorio[0] +  'px';
            ladrillo0Repeticion = setInterval(lanzarLadrillo0, numAleatorioVelocidad[0]);
            enCaida[0] = true;
        }
    
        if (enCaida[1] == null || enCaida[1] == false) {
            ladrillo1.style.left = numAleatorio[1] +  'px';
            ladrillo1Repeticion = setInterval(lanzarLadrillo1, numAleatorioVelocidad[1]);
            enCaida[1] = true;
        }
        
        if (enCaida[2] == null || enCaida[2] == false) {
            ladrillo2.style.left = numAleatorio[2] +  'px';
            ladrillo2Repeticion = setInterval(lanzarLadrillo2, numAleatorioVelocidad[2]);
            enCaida[2] = true;
        }
    
        if (enCaida[3] == null || enCaida[3] == false) {
            ladrillo3.style.left = numAleatorio[3] +  'px';
            ladrillo3Repeticion = setInterval(lanzarLadrillo3, numAleatorioVelocidad[3]);
            enCaida[3] = true;
        }
    }

    if (dificultad == 8 || dificultad == 16) {
        if (enCaida[4] == null || enCaida[4] == false) {
            ladrillo4.style.left = numAleatorio[4] +  'px';
            ladrillo4Repeticion = setInterval(lanzarLadrillo4, numAleatorioVelocidad[4]);
            enCaida[4] = true;
        }
    
        if (enCaida[5] == null || enCaida[5] == false) {
            ladrillo5.style.left = numAleatorio[5] +  'px';
            ladrillo5Repeticion = setInterval(lanzarLadrillo5, numAleatorioVelocidad[5]);
            enCaida[5] = true;
        }
    
        if (enCaida[6] == null || enCaida[6] == false) {
            ladrillo6.style.left = numAleatorio[6] +  'px';
            ladrillo6Repeticion = setInterval(lanzarLadrillo6, numAleatorioVelocidad[6]);
            enCaida[6] = true;
        }
    
        if (enCaida[7] == null || enCaida[7] == false) {
            ladrillo7.style.left = numAleatorio[7] +  'px';
            ladrillo7Repeticion = setInterval(lanzarLadrillo7, numAleatorioVelocidad[7]);
            enCaida[7] = true;
        }
    }

    if (dificultad == 16) { 
        if (enCaida[8] == null || enCaida[8] == false) {
            ladrillo8.style.left = numAleatorio[8] +  'px';
            ladrillo8Repeticion = setInterval(lanzarLadrillo8, numAleatorioVelocidad[8]);
            enCaida[8] = true;
        }
    
        if (enCaida[9] == null || enCaida[9] == false) {
            ladrillo9.style.left = numAleatorio[9] +  'px';
            ladrillo9Repeticion = setInterval(lanzarLadrillo9, numAleatorioVelocidad[9]);
            enCaida[9] = true;
        }
    
        if (enCaida[10] == null || enCaida[10] == false) {
            ladrillo10.style.left = numAleatorio[10] +  'px';
            ladrillo10Repeticion = setInterval(lanzarLadrillo10, numAleatorioVelocidad[10]);
            enCaida[10] = true;
        }
    
        if (enCaida[11] == null || enCaida[11] == false) {
            ladrillo11.style.left = numAleatorio[11] +  'px';
            ladrillo11Repeticion = setInterval(lanzarLadrillo11, numAleatorioVelocidad[11]);
            enCaida[11] = true;
        }

        if (enCaida[12] == null || enCaida[12] == false) {
            ladrillo12.style.left = numAleatorio[12] +  'px';
            ladrillo12Repeticion = setInterval(lanzarLadrillo12, numAleatorioVelocidad[12]);
            enCaida[12] = true;
        }
    
        if (enCaida[13] == null || enCaida[13] == false) {
            ladrillo13.style.left = numAleatorio[13] +  'px';
            ladrillo13Repeticion = setInterval(lanzarLadrillo13, numAleatorioVelocidad[13]);
            enCaida[13] = true;
        }
    
        if (enCaida[14] == null || enCaida[15] == false) {
            ladrillo15.style.left = numAleatorio[15] +  'px';
            ladrillo15Repeticion = setInterval(lanzarLadrillo14, numAleatorioVelocidad[15]);
            enCaida[15] = true;
        }
    
        if (enCaida[15] == null || enCaida[15] == false) {
            ladrillo15.style.left = numAleatorio[15] +  'px';
            ladrillo15Repeticion = setInterval(lanzarLadrillo15, numAleatorioVelocidad[15]);
            enCaida[15] = true;
        }
    }


    function lanzarLadrillo0() {
        if (alturaLadrillo[0] <= 80) {
            clearInterval(ladrillo0Repeticion);
            enCaida[0] = false;
            alturaLadrillo[0] = 3200;
        }else{
            alturaLadrillo[0] = alturaLadrillo[0] - 5;
            ladrillo0.style.bottom = alturaLadrillo[0] + 'px';
        }
        
    }

    function lanzarLadrillo1() {
        if (alturaLadrillo[1] <= 80) {
            clearInterval(ladrillo1Repeticion);
            enCaida[1] = false;
            alturaLadrillo[1] = 3200;
        }else{
            alturaLadrillo[1] = alturaLadrillo[1] - 5;
            ladrillo1.style.bottom = alturaLadrillo[1] + 'px';
        }
        
    }

    function lanzarLadrillo2() {
        if (alturaLadrillo[2] <= 80) {
            clearInterval(ladrillo2Repeticion);
            enCaida[2] = false;
            alturaLadrillo[2] = 3200;
        }else{
            alturaLadrillo[2] = alturaLadrillo[2] - 5;
            ladrillo2.style.bottom = alturaLadrillo[2] + 'px';
        }
        
    }

    function lanzarLadrillo3() {
        if (alturaLadrillo[3] <= 80) {
            clearInterval(ladrillo3Repeticion);
            enCaida[3] = false;
            alturaLadrillo[3] = 3200;
        }else{
            alturaLadrillo[3] = alturaLadrillo[3] - 5;
            ladrillo3.style.bottom = alturaLadrillo[3] + 'px';
        }  
    }

    function lanzarLadrillo4() {
        if (alturaLadrillo[4] <= 80) {
            clearInterval(ladrillo4Repeticion);
            enCaida[4] = false;
            alturaLadrillo[4] = 3200;
        }else{
            alturaLadrillo[4] = alturaLadrillo[4] - 5;
            ladrillo4.style.bottom = alturaLadrillo[4] + 'px';
        }  
    }

    function lanzarLadrillo5() {
        if (alturaLadrillo[5] <= 80) {
            clearInterval(ladrillo5Repeticion);
            enCaida[5] = false;
            alturaLadrillo[5] = 3200;
        }else{
            alturaLadrillo[5] = alturaLadrillo[5] - 5;
            ladrillo5.style.bottom = alturaLadrillo[5] + 'px';
        }  
    }

    function lanzarLadrillo6() {
        if (alturaLadrillo[6] <= 80) {
            clearInterval(ladrillo6Repeticion);
            enCaida[6] = false;
            alturaLadrillo[6] = 3200;
        }else{
            alturaLadrillo[6] = alturaLadrillo[6] - 5;
            ladrillo6.style.bottom = alturaLadrillo[6] + 'px';
        }  
    }

    function lanzarLadrillo7() {
        if (alturaLadrillo[7] <= 80) {
            clearInterval(ladrillo7Repeticion);
            enCaida[7] = false;
            alturaLadrillo[7] = 3200;
        }else{
            alturaLadrillo[7] = alturaLadrillo[7] - 5;
            ladrillo7.style.bottom = alturaLadrillo[7] + 'px';
        }  
    }

    function lanzarLadrillo8() {
        if (alturaLadrillo[8] <= 80) {
            clearInterval(ladrillo8Repeticion);
            enCaida[8] = false;
            alturaLadrillo[8] = 3200;
        }else{
            alturaLadrillo[8] = alturaLadrillo[8] - 5;
            ladrillo8.style.bottom = alturaLadrillo[8] + 'px';
        }
        
    }

    function lanzarLadrillo9() {
        if (alturaLadrillo[9] <= 80) {
            clearInterval(ladrillo9Repeticion);
            enCaida[9] = false;
            alturaLadrillo[9] = 3200;
        }else{
            alturaLadrillo[9] = alturaLadrillo[9] - 5;
            ladrillo9.style.bottom = alturaLadrillo[9] + 'px';
        }
        
    }

    function lanzarLadrillo10() {
        if (alturaLadrillo[10] <= 80) {
            clearInterval(ladrillo10Repeticion);
            enCaida[10] = false;
            alturaLadrillo[10] = 3200;
        }else{
            alturaLadrillo[10] = alturaLadrillo[10] - 5;
            ladrillo10.style.bottom = alturaLadrillo[10] + 'px';
        }
        
    }

    function lanzarLadrillo11() {
        if (alturaLadrillo[11] <= 80) {
            clearInterval(ladrillo11Repeticion);
            enCaida[11] = false;
            alturaLadrillo[11] = 3200;
        }else{
            alturaLadrillo[11] = alturaLadrillo[11] - 5;
            ladrillo11.style.bottom = alturaLadrillo[11] + 'px';
        }  
    }

    function lanzarLadrillo12() {
        if (alturaLadrillo[12] <= 80) {
            clearInterval(ladrillo12Repeticion);
            enCaida[12] = false;
            alturaLadrillo[12] = 3200;
        }else{
            alturaLadrillo[12] = alturaLadrillo[12] - 5;
            ladrillo12.style.bottom = alturaLadrillo[12] + 'px';
        }  
    }

    function lanzarLadrillo13() {
        if (alturaLadrillo[13] <= 80) {
            clearInterval(ladrillo13Repeticion);
            enCaida[13] = false;
            alturaLadrillo[13] = 3200;
        }else{
            alturaLadrillo[13] = alturaLadrillo[13] - 5;
            ladrillo13.style.bottom = alturaLadrillo[13] + 'px';
        }  
    }

    function lanzarLadrillo14() {
        if (alturaLadrillo[14] <= 80) {
            clearInterval(ladrillo14Repeticion);
            enCaida[14] = false;
            alturaLadrillo[14] = 3200;
        }else{
            alturaLadrillo[14] = alturaLadrillo[14] - 5;
            ladrillo14.style.bottom = alturaLadrillo[14] + 'px';
        }  
    }

    function lanzarLadrillo15() {
        if (alturaLadrillo[15] <= 80) {
            clearInterval(ladrillo15Repeticion);
            enCaida[15] = false;
            alturaLadrillo[15] = 3200;
        }else{
            alturaLadrillo[15] = alturaLadrillo[15] - 5;
            ladrillo15.style.bottom = alturaLadrillo[15] + 'px';
        }  
    }

    posicionJugador = document.getElementById("jugador");
    posicionJugadorAltura = parseInt(posicionJugador.style.bottom);
    posicionJugadorAnchura = parseInt(posicionJugador.style.left);


    for (let i = 0; i < dificultad; i++) { //comprueba la posicion de cada ladrillo y le da un margen a cada lado
        if (i == 0) {
            colisionAltura1 = parseInt(ladrillo0.style.bottom) - 130;
            colisionAltura2 = parseInt(ladrillo0.style.bottom) + 50;
            colisionAnchura1 = parseInt(ladrillo0.style.left) - 50;
            colisionAnchura2 = parseInt(ladrillo0.style.left) + 70;
        } else if (i == 1) {
            colisionAltura1 = parseInt(ladrillo1.style.bottom) - 130;
            colisionAltura2 = parseInt(ladrillo1.style.bottom) + 50;
            colisionAnchura1 = parseInt(ladrillo1.style.left) - 50;
            colisionAnchura2 = parseInt(ladrillo1.style.left) + 70;
        } else if (i == 2) {
            colisionAltura1 = parseInt(ladrillo2.style.bottom) - 130;
            colisionAltura2 = parseInt(ladrillo2.style.bottom) + 50;
            colisionAnchura1 = parseInt(ladrillo2.style.left) - 50;
            colisionAnchura2 = parseInt(ladrillo2.style.left) + 70;
        } else if (i == 3) {
            colisionAltura1 = parseInt(ladrillo3.style.bottom) - 130;
            colisionAltura2 = parseInt(ladrillo3.style.bottom) + 50;
            colisionAnchura1 = parseInt(ladrillo3.style.left) - 50;
            colisionAnchura2 = parseInt(ladrillo3.style.left) + 70;
        } else if (i == 4) {
            colisionAltura1 = parseInt(ladrillo4.style.bottom) - 130;
            colisionAltura2 = parseInt(ladrillo4.style.bottom) + 50;
            colisionAnchura1 = parseInt(ladrillo4.style.left) - 50;
            colisionAnchura2 = parseInt(ladrillo4.style.left) + 70;
        } else if (i == 5) {
            colisionAltura1 = parseInt(ladrillo5.style.bottom) - 130;
            colisionAltura2 = parseInt(ladrillo5.style.bottom) + 50;
            colisionAnchura1 = parseInt(ladrillo5.style.left) - 50;
            colisionAnchura2 = parseInt(ladrillo5.style.left) + 70;
        } else if (i == 6) {
            colisionAltura1 = parseInt(ladrillo6.style.bottom) - 130;
            colisionAltura2 = parseInt(ladrillo6.style.bottom) + 50;
            colisionAnchura1 = parseInt(ladrillo6.style.left) - 50;
            colisionAnchura2 = parseInt(ladrillo6.style.left) + 70;
        } else if (i == 7) {
            colisionAltura1 = parseInt(ladrillo7.style.bottom) - 130;
            colisionAltura2 = parseInt(ladrillo7.style.bottom) + 50;
            colisionAnchura1 = parseInt(ladrillo7.style.left) - 50;
            colisionAnchura2 = parseInt(ladrillo7.style.left) + 70;
        } else if (i == 8) {
            colisionAltura1 = parseInt(ladrillo8.style.bottom) - 130;
            colisionAltura2 = parseInt(ladrillo8.style.bottom) + 50;
            colisionAnchura1 = parseInt(ladrillo8.style.left) - 50;
            colisionAnchura2 = parseInt(ladrillo8.style.left) + 70;
        } else if (i == 9) {
            colisionAltura1 = parseInt(ladrillo9.style.bottom) - 130;
            colisionAltura2 = parseInt(ladrillo9.style.bottom) + 50;
            colisionAnchura1 = parseInt(ladrillo9.style.left) - 50;
            colisionAnchura2 = parseInt(ladrillo9.style.left) + 70;
        } else if (i == 10) {
            colisionAltura1 = parseInt(ladrillo10.style.bottom) - 130;
            colisionAltura2 = parseInt(ladrillo10.style.bottom) + 50;
            colisionAnchura1 = parseInt(ladrillo10.style.left) - 50;
            colisionAnchura2 = parseInt(ladrillo10.style.left) + 70;
        } else if (i == 11) {
            colisionAltura1 = parseInt(ladrillo11.style.bottom) - 130;
            colisionAltura2 = parseInt(ladrillo11.style.bottom) + 50;
            colisionAnchura1 = parseInt(ladrillo11.style.left) - 50;
            colisionAnchura2 = parseInt(ladrillo11.style.left) + 70;
        } else if (i == 12) {
            colisionAltura1 = parseInt(ladrillo12.style.bottom) - 130;
            colisionAltura2 = parseInt(ladrillo12.style.bottom) + 50;
            colisionAnchura1 = parseInt(ladrillo12.style.left) - 50;
            colisionAnchura2 = parseInt(ladrillo12.style.left) + 70;
        } else if (i == 13) {
            colisionAltura1 = parseInt(ladrillo13.style.bottom) - 130;
            colisionAltura2 = parseInt(ladrillo13.style.bottom) + 50;
            colisionAnchura1 = parseInt(ladrillo13.style.left) - 50;
            colisionAnchura2 = parseInt(ladrillo13.style.left) + 70;
        } else if (i == 14) {
            colisionAltura1 = parseInt(ladrillo14.style.bottom) - 130;
            colisionAltura2 = parseInt(ladrillo14.style.bottom) + 50;
            colisionAnchura1 = parseInt(ladrillo14.style.left) - 50;
            colisionAnchura2 = parseInt(ladrillo14.style.left) + 70;
        } else if (i == 15) {
            colisionAltura1 = parseInt(ladrillo15.style.bottom) - 130;
            colisionAltura2 = parseInt(ladrillo15.style.bottom) + 50;
            colisionAnchura1 = parseInt(ladrillo15.style.left) - 50;
            colisionAnchura2 = parseInt(ladrillo15.style.left) + 70;
        }
        
        //comprueba la colision con el jugador
        if ( (posicionJugadorAnchura > colisionAnchura1 && posicionJugadorAnchura < colisionAnchura2) && (posicionJugadorAltura > colisionAltura1 && posicionJugadorAltura < colisionAltura2) && (dentroHabitacion == false || dentroHabitacion == null)) {
            gameOver = true;
            impactoSonido.play();
            posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/muerto1.png)";
            i = dificultad;
            clearInterval(ejectuarLanzarLadrillos);
            
            setTimeout(function(muerto){
                posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/muerto2.png)";
                posicionJugador.style.width = "130px";
                finPartida();
                
            }, 300);
        } 
    }
    
    
    

    
}

function finPartida() {
    let imagenGameOver;
    perderSonido.play();
    sonidoTrafico.pause();
    if (tiempoAcabado == true) {    
        imagenGameOver = document.getElementsByClassName("finPartidaTiempo");
        imagenGameOver[0].style.zIndex = "30";
        clearInterval(ejectuarPrograma2);
    }else {
        imagenGameOver = document.getElementsByClassName("finPartida");
        imagenGameOver[0].style.zIndex = "30";
        clearInterval(ejectuarPrograma2);
    }
    
}

function moverse(){
    let posicion;
    let posicionJugador;
    let posicionSalto;
    let cambiarFondo;
    let cambiarHabitacion;
    let cambiarFondoVacio;
    let cambiarPergamino;
    let cambiarObjeto1;
    let cambiarObjeto2;
    let cambiarObjeto3;
    let cambiarGrua;
    let ocultarGrua;
    let ActivarPergaminoNav;
    let activarParpadeo;
    let parpadeoActivado;
    
    sonidoTrafico.play();
    // posicionJugador = document.getElementById("jugador");
    // posicionJugador.scrollIntoView({block: "end", behavior: "auto"}); 
    comprobarInactividad();

    if (teclaPresionada[0] == true && gameOver == false){ //SALTO ------------------------------------------------------------------------------------------------------------------------------
        posicionJugador = document.getElementById("jugador");
        posicionIzquierda = parseInt(posicionJugador.style.left);
        saltoSonido.play();
        ayudaSaltar();

        if (posicionJugador.style.bottom == '150px'){ //PISO 0
            posicion = salto(posicion, posicionJugador);

            setTimeout(function(moverseAbajoPiso1){
                posicionJugador.style.bottom = (posicion - 20) + 'px';
                posicion = parseInt(posicionJugador.style.left);
                if((posicionIzquierda > 195 && posicionIzquierda < 405) || (posicionIzquierda > 720 && posicionIzquierda < 885) || (posicionIzquierda > 1188 && posicionIzquierda < 1350)){
                    posicion = parseInt(posicionJugador.style.bottom);
                    posicionJugador.style.transitionTimingFunction = 'ease-in';
                    posicionJugador.style.transitionDuration = '0.1s'
                    posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/saltar1.png)";
                    posicionJugador.style.bottom = posicion + 'px';
                    pisoActual = 1;
                    // window.scroll( 0, 2000);               
                }else if (posicion > 30 && posicion < 120 && posicionJugador.style.bottom == "480px" && pergamino[8] == null) {
                    cambiarPergamino = document.getElementById("pergaminoComercInternacional");
                    ActivarPergaminoNav = document.getElementById("pergamino8");
                    numPergamino = 8;
                    rutaPergamino = "url(img/Pergaminos/comercInternacional.png)";
                    parpadeoPergaminoNav(cambiarPergamino, ActivarPergaminoNav, numPergamino);
                    pergamino[8] = true;
                    pergaminoSonido.play();
                    posicion = parseInt(posicionJugador.style.bottom) - 330;
                    posicionJugador.style.transitionTimingFunction = 'ease-in';
                    posicionJugador.style.transitionDuration = '0.3s';
                    posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/saltar1.png)";
                    posicionJugador.style.bottom = posicion + 'px';
                }else{
                    posicion = parseInt(posicionJugador.style.bottom) - 330;
                    posicionJugador.style.transitionTimingFunction = 'ease-in';
                    posicionJugador.style.transitionDuration = '0.3s';
                    posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/saltar1.png)";
                    posicionJugador.style.bottom = posicion + 'px';
                }         
            },300);
        
        } else if (posicionJugador.style.bottom == '480px' && pergamino[0] == true) { //PISO 1
            posicion = salto(posicion, posicionJugador); 

            setTimeout(function(moverseAbajoPiso2){           
                posicionJugador.style.bottom = (posicion - 120) + 'px';
                if((posicionIzquierda > 0 && posicionIzquierda < 165) || (posicionIzquierda > 450 && posicionIzquierda < 600) || (posicionIzquierda > 1188 && posicionIzquierda < 1350)){
                    posicion = parseInt(posicionJugador.style.bottom);
                    posicionJugador.style.transitionTimingFunction = 'ease-in';
                    posicionJugador.style.transitionDuration = '0.2s'
                    posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/saltar1.png)";
                    posicionJugador.style.bottom = posicion + 'px';
                    pisoActual = 2;        
                }else{
                    posicion = parseInt(posicionJugador.style.bottom) - 230;
                    posicionJugador.style.transitionTimingFunction = 'ease-in';
                    posicionJugador.style.transitionDuration = '0.3s'
                    posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/saltar1.png)";
                    posicionJugador.style.bottom = posicion + 'px';
                }         
            },300);
            
        } else if (posicionJugador.style.bottom == '710px' && pergamino[1] == true) { //PISO 2  
            posicion = salto(posicion, posicionJugador);

            setTimeout(function(moverseAbajoPiso2){
                posicionSalto = parseInt(posicionJugador.style.left);
                posicionJugador.style.bottom = (posicion - 115) + 'px';
                if((posicionIzquierda > 195 && posicionIzquierda < 405) || (posicionIzquierda > 915 && posicionIzquierda < 1125) ){
                    posicion = parseInt(posicionJugador.style.bottom);
                    posicionJugador.style.transitionTimingFunction = 'ease-in';
                    posicionJugador.style.transitionDuration = '0.2s'
                    posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/saltar1.png)";
                    posicionJugador.style.bottom = posicion + 'px';
                    pisoActual = 3;    
                }else if (posicionSalto > 440 && posicionSalto < 520 && posicionJugador.style.bottom == "945px" && pergamino[9] == null) {
                    cambiarPergamino = document.getElementById("pergaminoGestioAdministrativa");
                    ActivarPergaminoNav = document.getElementById("pergamino9");
                    numPergamino = 9;
                    rutaPergamino = "url(img/Pergaminos/gestioAdministrativa.png)";
                    parpadeoPergaminoNav(cambiarPergamino, ActivarPergaminoNav, numPergamino);
                    pergamino[9] = true;
                    pergaminoSonido.play();
                    posicion = parseInt(posicionJugador.style.bottom) - 235;
                    posicionJugador.style.transitionTimingFunction = 'ease-in';
                    posicionJugador.style.transitionDuration = '0.3s';
                    posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/saltar1.png)";
                    posicionJugador.style.bottom = posicion + 'px';
                }else{
                    posicion = parseInt(posicionJugador.style.bottom) - 235;
                    posicionJugador.style.transitionTimingFunction = 'ease-in';
                    posicionJugador.style.transitionDuration = '0.3s'
                    posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/saltar1.png)";
                    posicionJugador.style.bottom = posicion + 'px';
                }      
            },300);
            
        } else if (posicionJugador.style.bottom == '945px' && pergamino[2] == true) { //PISO 3
            posicion = salto(posicion, posicionJugador); 

            setTimeout(function(moverseAbajoPiso2){
                posicionJugador.style.bottom = (posicion - 120) + 'px';
                if((posicionIzquierda > 0 && posicionIzquierda < 165) || (posicionIzquierda > 450 && posicionIzquierda < 600) || (posicionIzquierda > 720 && posicionIzquierda < 870) || (posicionIzquierda > 1188 && posicionIzquierda < 1350) ){
                    posicion = parseInt(posicionJugador.style.bottom);
                    posicionJugador.style.transitionTimingFunction = 'ease-in';
                    posicionJugador.style.transitionDuration = '0.2s'
                    posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/saltar1.png)";
                    posicionJugador.style.bottom = posicion + 'px';
                    pisoActual = 4;   
                }else{
                    posicion = parseInt(posicionJugador.style.bottom) - 230;
                    posicionJugador.style.transitionTimingFunction = 'ease-in';
                    posicionJugador.style.transitionDuration = '0.3s'
                    posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/saltar1.png)";
                    posicionJugador.style.bottom = posicion + 'px';
                }      
            },300);
            
        } else if (posicionJugador.style.bottom == '1175px' && pergamino[3] == true) { //PISO 4
            posicion = salto(posicion, posicionJugador);

            setTimeout(function(moverseAbajoPiso2){   
                posicionSalto = parseInt(posicionJugador.style.left);      
                posicionJugador.style.bottom = (posicion - 115) + 'px';
                if((posicionIzquierda > 195 && posicionIzquierda < 405) || (posicionIzquierda > 720 && posicionIzquierda < 870) || (posicionIzquierda > 1188 && posicionIzquierda < 1350)){
                    posicion = parseInt(posicionJugador.style.bottom);
                    posicionJugador.style.transitionTimingFunction = 'ease-in';
                    posicionJugador.style.transitionDuration = '0.2s'
                    posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/saltar1.png)";
                    posicionJugador.style.bottom = posicion + 'px';
                    pisoActual = 5;    
                }else if (posicionSalto > 45 && posicionSalto < 105 && posicionJugador.style.bottom == "1410px" && pergamino[7] == null) {
                    cambiarPergamino = document.getElementById("pergaminoAsistenciaDireccio");
                    ActivarPergaminoNav = document.getElementById("pergamino7");
                    numPergamino = 7;
                    rutaPergamino = "url(img/Pergaminos/assistenciaDireccio.png)";
                    parpadeoPergaminoNav(cambiarPergamino, ActivarPergaminoNav, numPergamino);
                    pergamino[7] = true;
                    pergaminoSonido.play();
                    posicion = parseInt(posicionJugador.style.bottom) - 235;
                    posicionJugador.style.transitionTimingFunction = 'ease-in';
                    posicionJugador.style.transitionDuration = '0.3s'
                    posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/saltar1.png)";
                    posicionJugador.style.bottom = posicion + 'px';
                }else{
                    posicion = parseInt(posicionJugador.style.bottom) - 235;
                    posicionJugador.style.transitionTimingFunction = 'ease-in';
                    posicionJugador.style.transitionDuration = '0.3s'
                    posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/saltar1.png)";
                    posicionJugador.style.bottom = posicion + 'px';
                }      
            },300);
            
        } else if (posicionJugador.style.bottom == '1410px' && pergamino[4] == true){ //PISO 5  
            posicion = salto(posicion, posicionJugador);

            setTimeout(function(moverseAbajoPiso2){           
                posicionJugador.style.bottom = (posicion - 75) + 'px';
                posicion = parseInt(posicionJugador.style.bottom);
                posicionJugador.style.transitionTimingFunction = 'ease-in';
                posicionJugador.style.transitionDuration = '0.2s'
                posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/saltar1.png)";
                posicionJugador.style.bottom = posicion + 'px';
                pisoActual = 6;  
            },300);

        } else if (posicionJugador.style.bottom == '1685px') { // TEJADO
            posicion = salto(posicion, posicionJugador);

            setTimeout(function(moverseAbajoPiso2){           
                posicionJugador.style.bottom = (posicion - 65) + 'px';
                if((posicionIzquierda > 390 &&  posicionIzquierda < 1155) ){ /* posicionIzquierda < 750) || (posicionIzquierda > 945 && */
                    posicion = parseInt(posicionJugador.style.bottom);
                    posicionJugador.style.transitionTimingFunction = 'ease-in';
                    posicionJugador.style.transitionDuration = '0.2s'
                    posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/saltar1.png)";
                    posicionJugador.style.bottom = posicion + 'px';
                    pisoActual = 7;     
                }else{
                    posicion = parseInt(posicionJugador.style.bottom) - 285;
                    posicionJugador.style.transitionTimingFunction = 'ease-in';
                    posicionJugador.style.transitionDuration = '0.3s'
                    posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/saltar1.png)";
                    posicionJugador.style.bottom = posicion + 'px';
                }         
            },300);
            
        } else if (posicionJugador.style.bottom == '1970px') { //GRUA
            if (botonGrua == false) {
                posicion = salto(posicion, posicionJugador);

                setTimeout(function(moverseAbajoPiso2){         
                    posicionJugador.style.bottom = (posicion - 195) + 'px';
                    if((posicionIzquierda > 805 && posicionIzquierda < 900) ){
                        posicion = parseInt(posicionJugador.style.bottom);
                        posicionJugador.style.transitionTimingFunction = 'ease-in';
                        posicionJugador.style.transitionDuration = '0.2s'
                        posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/saltar1.png)";
                        posicionJugador.style.bottom = posicion + 'px';
                        pisoActual = 8;                
                    }else{
                        posicion = parseInt(posicionJugador.style.bottom) - 155;
                        posicionJugador.style.transitionTimingFunction = 'ease-in';
                        posicionJugador.style.transitionDuration = '0.3s'
                        posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/saltar1.png)";
                        posicionJugador.style.bottom = posicion + 'px';
                    }               
                },300);
            } else if (botonGrua == true) {
            
                posicion = salto(posicion, posicionJugador);

                setTimeout(function(moverseAbajoPiso2){         
                    posicionJugador.style.bottom = (posicion - 108) + 'px';
                    if((posicionIzquierda > 195 && posicionIzquierda < 525) ){
                        posicion = parseInt(posicionJugador.style.bottom);
                        posicionJugador.style.transitionTimingFunction = 'ease-in';
                        posicionJugador.style.transitionDuration = '0.2s'
                        posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/saltar1.png)";
                        posicionJugador.style.bottom = posicion + 'px';
                        pisoActual = 9;                
                    }else{
                        posicion = parseInt(posicionJugador.style.bottom) - 242;
                        posicionJugador.style.transitionTimingFunction = 'ease-in';
                        posicionJugador.style.transitionDuration = '0.3s'
                        posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/saltar1.png)";
                        posicionJugador.style.bottom = posicion + 'px';
                    }               
                },300);
            }
            
          
        }


    }else if(teclaPresionada[1] == true && gameOver == false){ //IZQUIERDA ---------------------------------------------------------------------------------------------------------------------

        contadorMovimientos++;
        pasosSonido.play();
        posicionJugador = document.getElementById("jugador");
        posicion = parseInt(posicionJugador.style.left) - 15;
        posicionJugador.style.transitionTimingFunction = 'initial';
        posicionJugador.style.transitionDuration = '0s';
        posicionJugador.style.transform = 'scaleX(-1)';

        if (posicion <= 0) {
            posicionJugador.style.left = 0 + 'px';
        }else if(posicion > 30 && posicion < 120 && posicionJugador.style.bottom == "480px" && pergamino[8] == null){
            cambiarPergamino = document.getElementById("pergaminoComercInternacional");
            ActivarPergaminoNav = document.getElementById("pergamino8");
            numPergamino = 8;
            rutaPergamino = "url(img/Pergaminos/comercInternacional.png)";
            parpadeoPergaminoNav(cambiarPergamino, ActivarPergaminoNav, numPergamino);
            pergamino[8] = true;
            pergaminoSonido.play();
        }else if(posicion > 450 && posicion < 510 && posicionJugador.style.bottom == "945px" && pergamino[9] == null){
            cambiarPergamino = document.getElementById("pergaminoGestioAdministrativa");
            ActivarPergaminoNav = document.getElementById("pergamino9");
            numPergamino = 9;
            rutaPergamino = "url(img/Pergaminos/gestioAdministrativa.png)";
            parpadeoPergaminoNav(cambiarPergamino, ActivarPergaminoNav, numPergamino);
            pergamino[9] = true;
            pergaminoSonido.play();
        }else if(posicion > 45 && posicion < 105 && posicionJugador.style.bottom == "1410px" && pergamino[7] == null){
            cambiarPergamino = document.getElementById("pergaminoAsistenciaDireccio");
            ActivarPergaminoNav = document.getElementById("pergamino7");
            numPergamino = 7;
            rutaPergamino = "url(img/Pergaminos/assistenciaDireccio.png)";
            parpadeoPergaminoNav(cambiarPergamino, ActivarPergaminoNav, numPergamino);
            pergamino[7] = true;
            pergaminoSonido.play();
        }else if(posicion > 1215 && posicion < 1290 && posicionJugador.style.bottom == "1685px" && pergamino[6] == null){
            cambiarPergamino = document.getElementById("pergaminoAgenciaViatges");
            ActivarPergaminoNav = document.getElementById("pergamino6");
            numPergamino = 6;
            rutaPergamino = "url(img/Pergaminos/agenciaViatges.png)";
            parpadeoPergaminoNav(cambiarPergamino, ActivarPergaminoNav, numPergamino);
            pergamino[6] = true;
            pergaminoSonido.play();
        }else if(posicion > 450 && posicion < 510 && posicionJugador.style.bottom == "1970px" && pergamino[5] == null){
            cambiarPergamino = document.getElementById("pergaminoAdministracioFinances");
            ActivarPergaminoNav = document.getElementById("pergamino5");
            numPergamino = 5;
            rutaPergamino = "url(img/Pergaminos/administracioFinances.png)";
            parpadeoPergaminoNav(cambiarPergamino, ActivarPergaminoNav, numPergamino);
            pergamino[5] = true;
            pergaminoSonido.play();
        }else if(posicion > 285 && posicion < 375 && posicionJugador.style.bottom == "2212px" && pergamino[10] == null){
            cambiarPergamino = document.getElementById("pergaminoGestioVendes");
            ActivarPergaminoNav = document.getElementById("pergamino10");
            numPergamino = 10;
            rutaPergamino = "url(img/Pergaminos/gestioVendes.png)";
            parpadeoPergaminoNav(cambiarPergamino, ActivarPergaminoNav, numPergamino);
            pergamino[10] = true;
            pergaminoSonido.play();
        }else{
            posicionJugador.style.left = posicion + 'px';
        }
        
        if (dentroHabitacion == true) { //mira si esta dentro de la habitacion secreta
            if (posicionJugador.style.bottom == '481px') {
                if (posicion <= 765 && pergamino[0] == true) {
                    cambiarFondo = document.getElementsByClassName("imagenFondo1");
                    cambiarFondoVacio = document.getElementsByClassName("fondoVacio");
                    cambiarHabitacion = document.getElementsByClassName("imagenPiso1");
                    posicion = salirHabitacion(cambiarFondo, cambiarFondoVacio, cambiarHabitacion, posicionJugador, dentroHabitacion, posicion);
                    posicionJugador.style.bottom = '480px';
                    dentroHabitacion = false;
                }else if (posicion <= 765) {
                    posicionJugador.style.left = 765 + 'px';
                }else{
                    posicionJugador.style.left = posicion + 'px';
                }

            }else if (posicionJugador.style.bottom == '711px') {
                if (posicion <= 60 &&  pergamino[1] == true) {
                    cambiarFondo = document.getElementsByClassName("imagenFondo2");
                    cambiarFondoVacio = document.getElementsByClassName("fondoVacio");
                    cambiarHabitacion = document.getElementsByClassName("imagenPiso2");
                    dentroHabitacion = false;
                    posicion = salirHabitacion(cambiarFondo, cambiarFondoVacio, cambiarHabitacion, posicionJugador, dentroHabitacion, posicion);
                    posicionJugador.style.bottom = '710px';

                }else if (posicion <= 40) {
                    posicionJugador.style.left = 40 + 'px';
                }else{
                    posicionJugador.style.left = posicion + 'px';
                }
            }else if (posicionJugador.style.bottom == '946px') {
                if (posicion >= 600 && posicion <= 660){
                    let parpadeoObjetos;
                    cambiarPergamino = document.getElementById("pergaminoSistemesMicroinformatics");
                    cambiarObjeto1 = document.getElementById("piso3Puente1");
                    cambiarObjeto2 = document.getElementById("piso3Puente2");
                    cambiarObjeto3 = document.getElementById("piso3Puente3"); 
                    ActivarPergaminoNav = document.getElementById("pergamino2");
                    numPergamino = 2;
                    contadorInactividad = 0;
                    rutaPergamino = "url(img/Pergaminos/smx.png)";
                    parpadeoPergaminoNav(cambiarPergamino, ActivarPergaminoNav, numPergamino);
                
                    if ((parpadeoActivado == null || parpadeoActivado == false) && pergamino[2] == null) {
                        parpadeoObjetos = setInterval(parpadeo, 200);
                        pergaminoSonido.play();
                    }

                    pergamino[2] = true;

                    function parpadeo(){
                        if(contador == 5){
                            contador = 0;
                            clearInterval(parpadeoObjetos);
                            activarParpadeo = false;
                            parpadeoActivado = false;
                        }else if (activarParpadeo == true || activarParpadeo == null) {
                            cambiarObjeto1.style.zIndex = "10";
                            cambiarObjeto2.style.zIndex = "10";
                            cambiarObjeto3.style.zIndex = "10";
                            activarParpadeo = false;
                            contador++;
                            parpadeoActivado = true;
                        }else{
                            cambiarObjeto1.style.zIndex = "-20";
                            cambiarObjeto2.style.zIndex = "-20";
                            cambiarObjeto3.style.zIndex = "-20";
                            activarParpadeo = true;
                            contador++;
                        }
                    } 
                    
                }else if (posicion <= 590) {
                    posicionJugador.style.left = 590 + 'px';
                }else{
                    posicionJugador.style.left = posicion + 'px';
                }
            }else if (posicionJugador.style.bottom == '1176px') {
                if (posicion <= 60 &&  pergamino[3] == true) {
                    cambiarFondo = document.getElementsByClassName("imagenFondo4");
                    cambiarFondoVacio = document.getElementsByClassName("fondoVacio");
                    cambiarHabitacion = document.getElementsByClassName("imagenPiso4");
                    posicion = salirHabitacion(cambiarFondo, cambiarFondoVacio, cambiarHabitacion, posicionJugador, dentroHabitacion, posicion);
                    posicionJugador.style.bottom = '1175px';
                    dentroHabitacion = false;
                }else if (posicion <= 60) {
                    posicionJugador.style.left = 60 + 'px';
                }else{
                    posicionJugador.style.left = posicion + 'px';
                }
            }else if (posicionJugador.style.bottom == '1411px') {

                if (posicion <= 765 && pergamino[0] == true) {
                    cambiarFondo = document.getElementsByClassName("imagenFondo5");
                    cambiarFondoVacio = document.getElementsByClassName("fondoVacio");
                    cambiarHabitacion = document.getElementsByClassName("imagenPiso5");
                    posicion = salirHabitacion(cambiarFondo, cambiarFondoVacio, cambiarHabitacion, posicionJugador, dentroHabitacion, posicion);
                    posicionJugador.style.bottom = '1410px';
                    dentroHabitacion = false;
                }else if (posicion <= 765) {
                    posicionJugador.style.left = 765 + 'px';
                }else{
                    posicionJugador.style.left = posicion + 'px';
                }

            }
        }

        if ( pergamino[0] == true && posicionJugador.style.bottom == "480px" ) { //si el pergamino de la planta actual esta cogido no puede caer por las plataformas, aqui mira si el jugador esta en el piso y el pergamino de ese piso cogido que no mire la funcion caer
        }else if (pergamino[1] == true && posicionJugador.style.bottom == "710px") {
        }else if (pergamino[2] == true && posicionJugador.style.bottom == "945px") {
        }else if (pergamino[3] == true && posicionJugador.style.bottom == "1175px") {    
        }else if (pergamino[4] == true && posicionJugador.style.bottom == "1410px") {
        }else{
            posicion = caer(posicion, posicionJugador); //comprueba la posicion actual para saber si el jugador tiene que caer
        }
            
        imgCorrerIzq++;   
            
        if (imgCorrerIzq == 1) { //cambia la imagen cada vez que se ejecuta el if
            posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/correr1.png)";
        } else if(imgCorrerIzq == 2) {
            posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/correr2.png)";
        } else if(imgCorrerIzq == 3){               
            posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/correr3.png)";
        } else if(imgCorrerIzq == 4){
            posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/correr4.png)";
        } else if(imgCorrerIzq == 5){
            posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/correr5.png)";
        } else if(imgCorrerIzq == 6){
            imgCorrerIzq = 0;
            posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/correr6.png)";
        }

    }else if(teclaPresionada[3] == true && gameOver == false){ //DERECHA ------------------------------------------------------------------------------------------------------------------
        
        contadorMovimientos++;
        posicionJugador = document.getElementById("jugador");
        posicion = parseInt(posicionJugador.style.left) + 15;
        posicionJugador.style.transform = 'scaleX(1)';
        posicionJugador.style.transitionTimingFunction = 'initial';
        posicionJugador.style.transitionDuration = '0s';
        pasosSonido.play();
        if (posicion >= 1350) {
            posicionJugador.style.left = 1350 + 'px';
        }else if(posicion > 30 && posicion < 120 && posicionJugador.style.bottom == "480px" && pergamino[8] == null){
            cambiarPergamino = document.getElementById("pergaminoComercInternacional");
            ActivarPergaminoNav = document.getElementById("pergamino8");
            numPergamino = 8;
            rutaPergamino = "url(img/Pergaminos/comercInternacional.png)";
            parpadeoPergaminoNav(cambiarPergamino, ActivarPergaminoNav, numPergamino);
            pergamino[8] = true;
            pergaminoSonido.play();
        }else if(posicion > 450 && posicion < 510 && posicionJugador.style.bottom == "945px" && pergamino[9] == null){
            cambiarPergamino = document.getElementById("pergaminoGestioAdministrativa");
            ActivarPergaminoNav = document.getElementById("pergamino9");
            numPergamino = 9;
            rutaPergamino = "url(img/Pergaminos/gestioAdministrativa.png)";
            parpadeoPergaminoNav(cambiarPergamino, ActivarPergaminoNav, numPergamino);
            pergamino[9] = true;
            pergaminoSonido.play();
        }else if(posicion > 45 && posicion < 105 && posicionJugador.style.bottom == "1410px" && pergamino[7] == null){
            cambiarPergamino = document.getElementById("pergaminoAsistenciaDireccio");
            ActivarPergaminoNav = document.getElementById("pergamino7");
            numPergamino = 7;
            rutaPergamino = "url(img/Pergaminos/assistenciaDireccio.png)";
            parpadeoPergaminoNav(cambiarPergamino, ActivarPergaminoNav, numPergamino);
            pergamino[7] = true;
            pergaminoSonido.play();
        }else if(posicion > 1215 && posicion < 1290 && posicionJugador.style.bottom == "1685px" && pergamino[6] == null){
            cambiarPergamino = document.getElementById("pergaminoAgenciaViatges");
            ActivarPergaminoNav = document.getElementById("pergamino6");
            numPergamino = 6;
            rutaPergamino = "url(img/Pergaminos/agenciaViatges.png)";
            parpadeoPergaminoNav(cambiarPergamino, ActivarPergaminoNav, numPergamino);
            pergamino[6] = true;
            pergaminoSonido.play();
        }else if(posicion > 450 && posicion < 510 && posicionJugador.style.bottom == "1970px" && pergamino[5] == null){
            cambiarPergamino = document.getElementById("pergaminoAdministracioFinances");
            ActivarPergaminoNav = document.getElementById("pergamino5");
            numPergamino = 5;
            rutaPergamino = "url(img/Pergaminos/administracioFinances.png)";
            parpadeoPergaminoNav(cambiarPergamino, ActivarPergaminoNav, numPergamino);
            pergamino[5] = true;
            pergaminoSonido.play();
        }else if(posicion > 285 && posicion < 375 && posicionJugador.style.bottom == "2212px" && pergamino[10] == null){
            cambiarPergamino = document.getElementById("pergaminoGestioVendes");
            ActivarPergaminoNav = document.getElementById("pergamino10");
            numPergamino = 10;
            rutaPergamino = "url(img/Pergaminos/gestioVendes.png)";
            parpadeoPergaminoNav(cambiarPergamino, ActivarPergaminoNav, numPergamino);
            pergamino[10] = true;
            pergaminoSonido.play();
        }else{
            posicionJugador.style.left = posicion + 'px';
        }

        if (dentroHabitacion == true) {
            if (posicionJugador.style.bottom == '481px') {
                if (posicion >= 1060 && posicion <= 1100){
                    let parpadeoObjetos;
                    
                    cambiarPergamino = document.getElementById("pergaminoDam");
                    cambiarObjeto1 = document.getElementById("piso1Puente1");
                    cambiarObjeto2 = document.getElementById("piso1Puente2");
                    cambiarObjeto3 = document.getElementById("piso1Puente3");
                    ActivarPergaminoNav = document.getElementById("pergamino0");
                    numPergamino = 0;
                    rutaPergamino = "url(img/Pergaminos/dam.png)";
                    contadorInactividad = 0;
                    parpadeoPergaminoNav(cambiarPergamino, ActivarPergaminoNav, numPergamino);
                    
                
                    if (parpadeoActivado == null && pergamino[0] == null) {
                        parpadeoObjetos = setInterval(parpadeo, 200);
                        pergaminoSonido.play();
                    }

                    pergamino[0] = true;

                    function parpadeo(){
                        if(contador == 5){
                            contador = 0;
                            clearInterval(parpadeoObjetos);
                            activarParpadeo = false;
                            parpadeoActivado = false;
                        }else if (activarParpadeo == true || activarParpadeo == null) {
                            cambiarObjeto1.style.zIndex = "10";
                            cambiarObjeto2.style.zIndex = "10";
                            cambiarObjeto3.style.zIndex = "10";
                            activarParpadeo = false;
                            contador++;
                            parpadeoActivado = true;
                        }else{
                            cambiarObjeto1.style.zIndex = "-20";
                            cambiarObjeto2.style.zIndex = "-20";
                            cambiarObjeto3.style.zIndex = "-20";
                            activarParpadeo = true;
                            contador++;
                        }
                    } 
                    
                }else if (posicion >= 1140) {
                    posicionJugador.style.left = 1150 + 'px';
                }else{
                    posicionJugador.style.left = posicion + 'px';
                }
            } else if (posicionJugador.style.bottom == '711px') {

                if (posicion >= 345 && posicion <= 405){
                    let parpadeoObjetos;
                    cambiarPergamino = document.getElementById("pergaminoDaw");
                    cambiarObjeto1 = document.getElementById("piso2Puente1");
                    cambiarObjeto2 = document.getElementById("piso2Puente2"); 
                    ActivarPergaminoNav = document.getElementById("pergamino1");
                    numPergamino = 1;
                    rutaPergamino = "url(img/Pergaminos/daw.png)";
                    contadorInactividad = 0;
                    parpadeoPergaminoNav(cambiarPergamino, ActivarPergaminoNav, numPergamino);
                
                    if ((parpadeoActivado == null || parpadeoActivado == false) && pergamino[1] == null) {
                        parpadeoObjetos = setInterval(parpadeo, 200);
                        pergaminoSonido.play();
                    }

                    pergamino[1] = true;

                    function parpadeo(){
                        if(contador == 5){
                            contador = 0;
                            clearInterval(parpadeoObjetos);
                            activarParpadeo = false;
                            parpadeoActivado = false;
                        }else if (activarParpadeo == true || activarParpadeo == null) {
                            cambiarObjeto1.style.zIndex = "10";
                            cambiarObjeto2.style.zIndex = "10";
                            activarParpadeo = false;
                            contador++;
                            parpadeoActivado = true;
                        }else{
                            cambiarObjeto1.style.zIndex = "-20";
                            cambiarObjeto2.style.zIndex = "-20";
                            activarParpadeo = true;
                            contador++;
                        }
                    } 
                    
                }else if (posicion >= 445) {
                    posicionJugador.style.left = 445 + 'px';
                }else{
                    posicionJugador.style.left = posicion + 'px';
                }
            }else if (posicionJugador.style.bottom == '946px') {
                if (posicion >= 990 &&  pergamino[2] == true) {
                    cambiarFondo = document.getElementsByClassName("imagenFondo3");
                    cambiarFondoVacio = document.getElementsByClassName("fondoVacio");
                    cambiarHabitacion = document.getElementsByClassName("imagenPiso3");
                    contadorInactividad = 0;
                    posicion = salirHabitacion(cambiarFondo, cambiarFondoVacio, cambiarHabitacion, posicionJugador, dentroHabitacion, posicion);
                    posicionJugador.style.bottom = '945px';
                    dentroHabitacion = false;

                }else if (posicion >= 990) {
                    posicionJugador.style.left = 990 + 'px';
                }else{
                    posicionJugador.style.left = posicion + 'px';
                }
            }else if (posicionJugador.style.bottom == '1176px') {

                if (posicion >= 335 && posicion <= 395){
                    let parpadeoObjetos;
                    cambiarPergamino = document.getElementById("pergaminoActvitatsComercials");
                    cambiarObjeto1 = document.getElementById("piso4Puente1");
                    cambiarObjeto2 = document.getElementById("piso4Puente2");
                    cambiarObjeto3 = document.getElementById("piso4Puente3"); 
                    ActivarPergaminoNav = document.getElementById("pergamino3");
                    numPergamino = 3;
                    rutaPergamino = "url(img/Pergaminos/activitatsComercials.png)";
                    contadorInactividad = 0;
                    parpadeoPergaminoNav(cambiarPergamino, ActivarPergaminoNav, numPergamino);
                    
                
                    if (parpadeoActivado == null && pergamino[3] == null) {
                        parpadeoObjetos = setInterval(parpadeo, 200);
                        pergaminoSonido.play();
                    }

                    pergamino[3] = true;

                    function parpadeo(){
                        if(contador == 5){
                            contador = 0;
                            clearInterval(parpadeoObjetos);
                            activarParpadeo = false;
                            parpadeoActivado = false;
                        }else if (activarParpadeo == true || activarParpadeo == null) {
                            cambiarObjeto1.style.zIndex = "10";
                            cambiarObjeto2.style.zIndex = "10";
                            cambiarObjeto3.style.zIndex = "10";
                            activarParpadeo = false;
                            contador++;
                            parpadeoActivado = true;
                        }else{
                            cambiarObjeto1.style.zIndex = "-20";
                            cambiarObjeto2.style.zIndex = "-20";
                            cambiarObjeto3.style.zIndex = "-20";
                            activarParpadeo = true;
                            contador++;
                        }
                    } 
                    
                }else if (posicion >= 425) {
                    posicionJugador.style.left = 425 + 'px';
                }else{
                    posicionJugador.style.left = posicion + 'px';
                }
            }else if (posicionJugador.style.bottom == '1411px') {
                if (posicion >= 1075 && posicion <= 1135){
                    let parpadeoObjetos;
                    cambiarPergamino = document.getElementById("pergaminoMarquetingPublicidad");
                    cambiarObjeto1 = document.getElementById("piso5Puente1");
                    cambiarObjeto2 = document.getElementById("piso5Puente2");
                    cambiarObjeto3 = document.getElementById("piso5Puente3"); 
                    ActivarPergaminoNav = document.getElementById("pergamino4");
                    numPergamino = 4;
                    rutaPergamino = "url(img/Pergaminos/marquetingPublicitat.png)";
                    contadorInactividad = 0;
                    parpadeoPergaminoNav(cambiarPergamino, ActivarPergaminoNav, numPergamino);
                
                    if (parpadeoActivado == null && pergamino[4] == null) {
                        parpadeoObjetos = setInterval(parpadeo, 200);
                        pergaminoSonido.play();
                    }

                    pergamino[4] = true;

                    function parpadeo(){
                        if(contador == 5){
                            contador = 0;
                            clearInterval(parpadeoObjetos);
                            activarParpadeo = false;
                            parpadeoActivado = false;
                        }else if (activarParpadeo == true || activarParpadeo == null) {
                            cambiarObjeto1.style.zIndex = "10";
                            cambiarObjeto2.style.zIndex = "10";
                            cambiarObjeto3.style.zIndex = "10";
                            activarParpadeo = false;
                            contador++;
                            parpadeoActivado = true;
                        }else{
                            cambiarObjeto1.style.zIndex = "-20";
                            cambiarObjeto2.style.zIndex = "-20";
                            cambiarObjeto3.style.zIndex = "-20";
                            activarParpadeo = true;
                            contador++;
                        }
                    } 
                    
                }else if (posicion >= 1140) {
                    posicionJugador.style.left = 1150 + 'px';
                }else{
                    posicionJugador.style.left = posicion + 'px';
                }
            }
        }

        if (pergamino[0] == true && posicionJugador.style.bottom == "480px") {    
        }else if (pergamino[1] == true && posicionJugador.style.bottom == "710px") {
        }else if (pergamino[2] == true && posicionJugador.style.bottom == "945px") {
        }else if (pergamino[3] == true && posicionJugador.style.bottom == "1175px") {
        }else if (pergamino[4] == true && posicionJugador.style.bottom == "1410px") {   
        }else{
            posicion = caer(posicion, posicionJugador);
        }
        
        
        
        imgCorrerDer++;

        if (imgCorrerDer == 1) {
            posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/correr1.png)";
        } else if(imgCorrerDer == 2) {
            posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/correr2.png)";
        } else if(imgCorrerDer == 3){               
            posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/correr3.png)";
        } else if(imgCorrerDer == 4){
            posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/correr4.png)";
        } else if(imgCorrerDer == 5){
            posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/correr5.png)";
        } else if(imgCorrerDer == 6){
            imgCorrerDer = 0;
            posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/correr6.png)";
        } 

    }else if(teclaPresionada[2] == true && gameOver == false){ //ARRIBA (ENTRAR) -----------------------------------------------------------------------------------------------------------------------------
        posicionJugador = document.getElementById("jugador");
        posicion = parseInt(posicionJugador.style.left);
        if ( (posicionJugador.style.bottom == '480px') && (posicion > 725 && posicion < 800) && pergamino[0] == null){ //mira que cuando pulsa la tecla arriba este en la zona de la puerta
            cambiarFondo = document.getElementsByClassName("imagenFondo1");
            cambiarFondoVacio = document.getElementsByClassName("fondoVacio");
            cambiarHabitacion = document.getElementsByClassName("imagenPiso1");
            cambiarPergamino = document.getElementById("pergaminoDam");
            cambiarFondo[0].style.zIndex = "4";
            cambiarHabitacion[0].style.zIndex = "1";
            cambiarFondoVacio[0].style.zIndex = "3";
            cambiarPergamino.style.zIndex = "2"
            posicionJugador.style.bottom = "481px";
            dentroHabitacion = true;
            puertaSonido.play();  
        }else if ((posicionJugador.style.bottom == '710px') && (posicion > 50 && posicion < 130) && pergamino[1] == null){
            cambiarFondo = document.getElementsByClassName("imagenFondo2");
            cambiarFondoVacio = document.getElementsByClassName("fondoVacio");
            cambiarHabitacion = document.getElementsByClassName("imagenPiso2");
            cambiarPergamino = document.getElementById("pergaminoDaw");
            cambiarFondo[0].style.zIndex = "4";
            cambiarHabitacion[0].style.zIndex = "1";
            cambiarFondoVacio[0].style.zIndex = "3";
            cambiarPergamino.style.zIndex = "2"
            posicionJugador.style.bottom = "711px";
            dentroHabitacion = true;
            puertaSonido.play(); 
        }else if ((posicionJugador.style.bottom == '945px') && (posicion > 970 && posicion < 1030) && pergamino[2] == null) {
            cambiarFondo = document.getElementsByClassName("imagenFondo3");
            cambiarFondoVacio = document.getElementsByClassName("fondoVacio");
            cambiarHabitacion = document.getElementsByClassName("imagenPiso3");
            cambiarPergamino = document.getElementById("pergaminoSistemesMicroinformatics");
            cambiarFondo[0].style.zIndex = "4";
            cambiarHabitacion[0].style.zIndex = "1";
            cambiarFondoVacio[0].style.zIndex = "3";
            cambiarPergamino.style.zIndex = "2"
            posicionJugador.style.bottom = "946px";
            dentroHabitacion = true;
            puertaSonido.play(); 
        }else if ((posicionJugador.style.bottom == '1175px') && (posicion > 60 && posicion < 105) && pergamino[3] == null) {
            cambiarFondo = document.getElementsByClassName("imagenFondo4");
            cambiarFondoVacio = document.getElementsByClassName("fondoVacio");
            cambiarHabitacion = document.getElementsByClassName("imagenPiso4");
            cambiarPergamino = document.getElementById("pergaminoActvitatsComercials");
            cambiarFondo[0].style.zIndex = "4";
            cambiarHabitacion[0].style.zIndex = "1";
            cambiarFondoVacio[0].style.zIndex = "3";
            cambiarPergamino.style.zIndex = "2"
            posicionJugador.style.bottom = "1176px";
            dentroHabitacion = true;
            puertaSonido.play(); 
        }else if ((posicionJugador.style.bottom == '1410px') && (posicion > 735 && posicion < 795) && pergamino[4] == null) {
            cambiarFondo = document.getElementsByClassName("imagenFondo5");
            cambiarFondoVacio = document.getElementsByClassName("fondoVacio");
            cambiarHabitacion = document.getElementsByClassName("imagenPiso5");
            cambiarPergamino = document.getElementById("pergaminoMarquetingPublicidad");
            cambiarFondo[0].style.zIndex = "4";
            cambiarHabitacion[0].style.zIndex = "1";
            cambiarFondoVacio[0].style.zIndex = "3";
            cambiarPergamino.style.zIndex = "2"
            posicionJugador.style.bottom = "1411px";
            dentroHabitacion = true;
            puertaSonido.play(); 
        }
    }else if (teclaPresionada[4] == true && gameOver == false) { // ABAJO ----------------------------------------------------------------------------------------------------------------------------
        posicionJugador = document.getElementById("jugador");
        posicion = parseInt(posicionJugador.style.left) - 15;
        posicionJugador.style.transitionTimingFunction = 'initial';
        posicionJugador.style.transitionDuration = '0s';

        if (posicion > 805 && posicion < 900 && posicionJugador.style.bottom == "2125px" && botonGrua == false) { //comprueba que esta en la posicion indicada para apretar el boton y que no ha sido apretado antes
            let cambiarBotonGrua;
            let zindexJugador;
            gruaSonido.play();
            cambiarBotonGrua = document.getElementsByClassName("botonGrua");
            zindexJugador = document.getElementsByClassName("fondoVacio");
            cambiarGrua = document.getElementById("grua");
            ocultarGrua = document.getElementById("taparGrua");
            cambiarPergamino = document.getElementById("pergaminoGestioVendes");
            zindexJugador[0].style.zIndex = "5";
            cambiarBotonGrua[0].style.backgroundImage = "url(img/botonOn.png)";
            cambiarBotonGrua[0].style.animation = "sinAnimacion";
            ocultarGrua.style.zIndex = "3";
            cambiarGrua.style.zIndex = "4";
            botonGrua = true;
            botonSonido.play();
            moverGrua(cambiarGrua, cambiarPergamino);
            
        }
    
    }else if ( (teclaPresionada[0] == false || teclaPresionada[0] == null) && (teclaPresionada[1] == false || teclaPresionada[1] == null) &&  (teclaPresionada[3] == false || teclaPresionada[3] == null) && gameOver == false) { //si el jugador no se mueve activa la imagen estatica
        posicionJugador = document.getElementById("jugador");
        posicionJugador.style.transitionTimingFunction = 'ease';

        imgEstatica++;

        if (imgEstatica == 1) {
            setTimeout(function(moverseAbajoPiso1){
            posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/estatico1.png)";
            },300);
        } else if(imgEstatica == 2) {
            setTimeout(function(moverseAbajoPiso1){
            posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/estatico2.png)";
            },300);
        } else if(imgEstatica == 3){ 
            setTimeout(function(moverseAbajoPiso1){              
            posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/estatico3.png)";
            },300);
        } else if(imgEstatica == 4){
            setTimeout(function(moverseAbajoPiso1){
            imgEstatica = 0;
            posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/estatico4.png)";
            },300);   
        }

        
    }

}

function ayudaSaltar() {
    let fraseAyuda;
    if (pisoActual == 1 && pergamino[0] == null) {
        mostrarFrase();
    } else if (pisoActual == 2 && pergamino[1] == null) {
        mostrarFrase();
    } else if (pisoActual == 3 && pergamino[2] == null) {
        mostrarFrase();
    } else if (pisoActual == 4 && pergamino[3] == null) {
        mostrarFrase();
    } else if (pisoActual == 5 && pergamino[4] == null) {
        mostrarFrase();
    }

    function mostrarFrase() {
        fraseAyuda = document.getElementById("ayudaSaltar");
        fraseAyuda.style.zIndex = "30";
        setTimeout(function(ocultarFrase) {
            fraseAyuda.style.zIndex = "-20";
        }, 5000);
    }
}

function comprobarInactividad() {
    let mostrarPuerta;

    if ( (pisoActual == 0 || pisoActual == 1) && pergamino[0] == null && contadorInactividad >= 20) {
        mostrarPuerta = document.getElementById("seleccionarPuerta1");
        mostrarPuerta.style.zIndex = "30";
        setTimeout(function(ocultarPuerta) {
            mostrarPuerta.style.zIndex = "-20";
        }, 4000);
        contadorInactividad = 0;
    } else if ((pisoActual == 1 || pisoActual == 2) && pergamino[1] == null && contadorInactividad >= 20) {
        mostrarPuerta = document.getElementById("seleccionarPuerta2");
        mostrarPuerta.style.zIndex = "30";
        setTimeout(function(ocultarPuerta) {
            mostrarPuerta.style.zIndex = "-20";
        }, 4000);
        contadorInactividad = 0;
    } else if ((pisoActual == 2 || pisoActual == 3) && pergamino[2] == null && contadorInactividad >= 20) {
        mostrarPuerta = document.getElementById("seleccionarPuerta3");
        mostrarPuerta.style.zIndex = "30";
        setTimeout(function(ocultarPuerta) {
            mostrarPuerta.style.zIndex = "-20";
        }, 4000);
        contadorInactividad = 0;
    } else if ((pisoActual == 3 || pisoActual == 4) && pergamino[3] == null && contadorInactividad >= 20) {
        mostrarPuerta = document.getElementById("seleccionarPuerta4");
        mostrarPuerta.style.zIndex = "30";
        setTimeout(function(ocultarPuerta) {
            mostrarPuerta.style.zIndex = "-20";
        }, 4000);
        contadorInactividad = 0;
    } else if ((pisoActual == 4 || pisoActual == 5) && pergamino[4] == null && contadorInactividad >= 20) {
        mostrarPuerta = document.getElementById("seleccionarPuerta5");
        mostrarPuerta.style.zIndex = "30";
        setTimeout(function(ocultarPuerta) {
            mostrarPuerta.style.zIndex = "-20";
        }, 4000);
        contadorInactividad = 0;
    }
}

function caer(posicion, posicionJugador){ //mira que estes fuera de los balcones para accionar la caida

    if ((posicionJugador.style.bottom == '710px') && ( (posicion > 166 && posicion < 449) || (posicion > 601 && posicion < 1187) ) ) { //PISO2
        posicion = parseInt(posicionJugador.style.bottom) - 230;
        posicionJugador.style.transitionTimingFunction = 'ease-in';
        posicionJugador.style.transitionDuration = '0.5s'
        posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/saltar1.png)";
        posicionJugador.style.bottom = posicion + 'px';
        pisoActual = 1;
             
    } else if ((posicionJugador.style.bottom == '480px') && ( (posicion < 195) || (posicion > 405 && posicion < 720) || (posicion > 885 && posicion < 1188) )) { //PISO 1
        posicion = parseInt(posicionJugador.style.bottom) - 330;
        posicionJugador.style.transitionTimingFunction = 'ease-in';
        posicionJugador.style.transitionDuration = '0.5s'
        posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/saltar1.png)";
        posicionJugador.style.bottom = posicion + 'px';
        pisoActual = 0;  

    }else if ((posicionJugador.style.bottom == '945px') && ( (posicion < 195) || (posicion > 420 && posicion < 885) || (posicion > 1188 && posicion < 1350) )) {
        posicion = parseInt(posicionJugador.style.bottom) - 235;
        posicionJugador.style.transitionTimingFunction = 'ease-in';
        posicionJugador.style.transitionDuration = '0.5s'
        posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/saltar1.png)";
        posicionJugador.style.bottom = posicion + 'px';
        pisoActual = 2;

    }else if ((posicionJugador.style.bottom == '1175px') && ( (posicion > 166 && posicion < 449) || (posicion > 601 && posicion < 720) || (posicion > 885 && posicion < 1188) )) {
        posicion = parseInt(posicionJugador.style.bottom) - 230;
        posicionJugador.style.transitionTimingFunction = 'ease-in';
        posicionJugador.style.transitionDuration = '0.5s'
        posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/saltar1.png)";
        posicionJugador.style.bottom = posicion + 'px';
        pisoActual = 3;

    }else if ((posicionJugador.style.bottom == '1410px') && ( (posicion < 195) || (posicion > 405 && posicion < 720) || (posicion > 885 && posicion < 1188) )) {
        posicion = parseInt(posicionJugador.style.bottom) - 235;
        posicionJugador.style.transitionTimingFunction = 'ease-in';
        posicionJugador.style.transitionDuration = '0.5s'
        posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/saltar1.png)";
        posicionJugador.style.bottom = posicion + 'px';
        pisoActual = 4;

    }else if ( (posicionJugador.style.bottom == '1970px') && ( posicion < 390 || posicion > 1155) ) {
        posicion = parseInt(posicionJugador.style.bottom) - 285;
        posicionJugador.style.transitionTimingFunction = 'ease-in';
        posicionJugador.style.transitionDuration = '0.5s'
        posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/saltar1.png)";
        posicionJugador.style.bottom = posicion + 'px';
        pisoActual = 6;

    }else if ( (posicionJugador.style.bottom == '2125px') && ( posicion < 805 || posicion > 900) ) {
        posicion = parseInt(posicionJugador.style.bottom) - 155;
        posicionJugador.style.transitionTimingFunction = 'ease-in';
        posicionJugador.style.transitionDuration = '0.5s'
        posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/saltar1.png)";
        posicionJugador.style.bottom = posicion + 'px';
        pisoActual = 7;
    
    }else if ( (posicionJugador.style.bottom == '2360px') && ( posicion < 195 || posicion > 525) ) {
        posicion = parseInt(posicionJugador.style.bottom) - 235;
        posicionJugador.style.transitionTimingFunction = 'ease-in';
        posicionJugador.style.transitionDuration = '0.5s'
        posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/saltar1.png)";
        posicionJugador.style.bottom = posicion + 'px';
        pisoActual = 8;
    }
    return posicion;
}

function salto(posicion, posicionJugador){
    posicion = parseInt(posicionJugador.style.bottom) + 350;
    posicionJugador.style.transitionTimingFunction = 'ease';
    posicionJugador.style.transitionDuration = '0.3s'
    posicionJugador.style.backgroundImage = "url(img/AnimacionJugador/saltar1.png)";
    posicionJugador.style.bottom = posicion + 'px';
    posicionIzquierda = parseInt(posicionJugador.style.left);
    
    return posicion;
}

function salirHabitacion (cambiarFondo, cambiarFondoVacio, cambiarHabitacion, posicionJugador, dentroHabitacion, posicion) { //cambia las capas para salir de la habitacion
    cambiarFondo[0].style.zIndex = "-20";
    cambiarHabitacion[0].style.zIndex = "-20";
    cambiarFondoVacio[0].style.zIndex = "1";
    posicionJugador.style.left = posicion + 'px';
    dentroHabitacion = false;
    return posicion;
}

function parpadeoPergaminoNav(cambiarPergamino, ActivarPergaminoNav, numPergamino) { //activalos pergaminos de la barra de arriba
    let parpadeoObjetoPergamino;
    let activarParpadeoPergamino;
    let parpadeoActivadoPergamino;

    cambiarPergamino.style.zIndex = "25";   
    cambiarPergamino.style.transitionDuration = "0.7s";
    cambiarPergamino.style.backgroundSize = "cover";
    cambiarPergamino.style.backgroundImage = rutaPergamino;
    cambiarPergamino.style.height = "500px";
    cambiarPergamino.style.width = "400px";
    setTimeout(function(desaparecerIcono) { //falta hacer parpadeo mas tarde 
        cambiarPergamino.style.left = "600px";
        cambiarPergamino.style.transitionDuration = "3s";
        cambiarPergamino.style.top = "0px";
        cambiarPergamino.style.height = "100px";
        cambiarPergamino.style.width = "80px";
        cambiarPergamino.style.zIndex = "-20";
    }, 1300);

    if (parpadeoActivadoPergamino == null && pergamino[numPergamino] == null) {
        setTimeout(function(iniciarPapadeo){
            parpadeoObjetoPergamino = setInterval(parpadeo, 300);
        }, 2000);
        
    }

    function parpadeo(){
        if(contadorPergamino == 5){
            contadorPergamino = 0;
            clearInterval(parpadeoObjetoPergamino);
            activarParpadeoPergamino = false;
            parpadeoActivadoPergamino = false;
        }else if (activarParpadeoPergamino == true || activarParpadeoPergamino == null) {
            ActivarPergaminoNav.style.zIndex = "21";
            activarParpadeoPergamino = false;
            contadorPergamino++;
            parpadeoActivadoPergamino = true;
            parpadeoSonido.play();
        }else{
            ActivarPergaminoNav.style.zIndex = "-21";
            activarParpadeoPergamino = true;
            contadorPergamino++;
        }
    } 
}

function moverGrua(cambiarGrua, cambiarPergamino){ //mueve la grua al pulsarel boton
    setTimeout(function(moverGrua) {
        cambiarGrua.style.transitionDuration = "3s";
        cambiarPergamino.style.transitionDuration = "3s";
        cambiarGrua.style.top = "600px";
        cambiarPergamino.style.top = "988px";
    }, 300);
    
}

function partidaGanada() {
    let pergaminosConseguidos = 0;
    let pergaminosNoConseguidos;

    if (pergamino[10] == true) {

        for (let i = 0; i < 11; i++) {
            if (pergamino[i] == true) {
                pergaminosConseguidos++;
            }
        }
    
        if (pergaminosConseguidos == 11) {
            let imagenGameWin;
            let escribirPuntos;
            let escribirBonus;
            let puntuacionJugador;
            let cambiarOpcion1;
            let cambiarOpcion2;
            ganarSonido.play();
            sonidoTrafico.pause();
            cambiarOpcion1 = document.getElementById("opcionGanar1");
            cambiarOpcion2 = document.getElementById("opcionGanar2");
            puntuacionJugador = document.getElementById("puntuacionJugador");
            imagenGameWin = document.getElementsByClassName("partidaGanada");
            cambiarOpcion1.style.zIndex = "32";
            cambiarOpcion2.style.zIndex = "32";
            puntuacionJugador.style.zIndex = "31";
            imagenGameWin[0].style.zIndex = "30";
            clearInterval(ejectuarPrograma2);
            clearInterval(ejectuarLanzarLadrillos);
            clearInterval(ejectuarPrograma3);
            clearInterval(ejectuarPrograma);
    
            if (dificultad == 16) { //70
                tiempoRestante = 70 - puntuacionObtenida;
                tiempoRestante = tiempoRestante * 200;
                puntuacionObtenida = puntuacionObtenida * 57;
                escribirPuntos = puntuacionObtenida;
                escribirBonus = 2500;
                puntuacionObtenida = puntuacionObtenida - contadorMovimientos + escribirBonus + tiempoRestante;
            }else if (dificultad == 8) { //90
                tiempoRestante = 90 - puntuacionObtenida;
                tiempoRestante = tiempoRestante * 60;
                puntuacionObtenida = puntuacionObtenida * 44;
                escribirPuntos = puntuacionObtenida;
                escribirBonus = 1000;
                puntuacionObtenida = puntuacionObtenida - contadorMovimientos + escribirBonus + tiempoRestante;
            }else{ //110
                tiempoRestante = 110 - puntuacionObtenida;
                tiempoRestante = tiempoRestante * 20;
                puntuacionObtenida = puntuacionObtenida * 36;
                escribirPuntos = puntuacionObtenida;
                escribirBonus = 100;
                puntuacionObtenida = puntuacionObtenida - contadorMovimientos + escribirBonus + tiempoRestante;
            }
            document.cookie = "puntuacionFinal=" + puntuacionObtenida;
            escribirPuntos = document.getElementById('mostrarPuntuacion').innerHTML = "+ " + escribirPuntos;
            tiempoRestante = document.getElementById('mostrarTiempoRestante').innerHTML = "+ " + tiempoRestante;
            contadorMovimientos = document.getElementById('mostrarMovimientos').innerHTML = "- " + contadorMovimientos;
            escribirBonus = document.getElementById('mostrarBonus').innerHTML = "+ " + escribirBonus;
            puntuacionObtenida = document.getElementById('mostrarTotal').innerHTML = "+ " + puntuacionObtenida;
    
            
        }else {
            gameOver = true;
            clearInterval(ejectuarLanzarLadrillos);
            finPartida();
            pergaminosNoConseguidos = document.getElementById("pergaminosNoConseguidos");
            pergaminosNoConseguidos.style.zIndex = "30";
        }

    }else{

    }
    
}
