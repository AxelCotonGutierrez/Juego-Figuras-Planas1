// Axel Cotón Gutiérrez Copyright 2023

// Cargar archivos de audio para la pregunta, las figuras, felicitaciones e inténtalo de nuevo
const audioPregunta = new Audio('https://raw.githubusercontent.com/AxelCotonGutierrez/Juego-Figuras-Planas1/master/audio/Pregunta.mp3');
const audioTriangulo = new Audio('https://raw.githubusercontent.com/AxelCotonGutierrez/Juego-Figuras-Planas1/master/audio/Triangulo.mp3');
const audioCuadrado = new Audio('https://raw.githubusercontent.com/AxelCotonGutierrez/Juego-Figuras-Planas1/master/audio/Cuadrado.mp3');
const audioCirculo = new Audio('https://raw.githubusercontent.com/AxelCotonGutierrez/Juego-Figuras-Planas1/master/audio/Circulo.mp3');
const felicidadesAudio = new Audio('https://raw.githubusercontent.com/AxelCotonGutierrez/Juego-Figuras-Planas1/master/audio/Felicidades.mp3');
const intentarAudio = new Audio('https://raw.githubusercontent.com/AxelCotonGutierrez/Juego-Figuras-Planas1/master/audio/Intentar.mp3');

document.addEventListener('DOMContentLoaded', iniciarJuego);

let ultimaFigura = '';
let gameOver = false; // Variable para controlar el estado del juego

function iniciarJuego() {
    gameOver = false; // Reiniciar el estado del juego
    enableGuessButtons(); // Habilitar botones de respuesta
    document.getElementById('result').textContent = '';
    document.getElementById('reiniciar').style.display = 'none';
    mostrarFiguraAleatoria();
}

function mostrarFiguraAleatoria() {
    const figuras = ['Triángulo', 'Cuadrado', 'Círculo'];
    let figurasDisponibles;

    // Si no es la primera ronda, eliminar la última figura de las opciones
    if (ultimaFigura) {
        figurasDisponibles = figuras.filter(figura => figura !== ultimaFigura);
    } else {
        figurasDisponibles = figuras.slice();
    }

    const figuraElegida = figurasDisponibles[Math.floor(Math.random() * figurasDisponibles.length)];

    const contenedorFigura = document.getElementById('figura');
    contenedorFigura.className = ''; // Limpiar clases anteriores
    contenedorFigura.style = ''; // Limpiar estilos anteriores

    // Configuración de las figuras
    switch (figuraElegida) {
        case 'Triángulo':
            contenedorFigura.style.borderLeft = `75px solid transparent`;
            contenedorFigura.style.borderRight = `75px solid transparent`;
            contenedorFigura.style.borderBottom = `150px solid black`;
            contenedorFigura.style.width = '0';
            contenedorFigura.style.height = '0';
            break;
        case 'Cuadrado':
            contenedorFigura.style.backgroundColor = 'blue';
            contenedorFigura.style.width = '150px';
            contenedorFigura.style.height = '150px';
            contenedorFigura.style.border = '5px solid black';
            break;
        case 'Círculo':
            contenedorFigura.style.backgroundColor = 'red';
            contenedorFigura.style.borderRadius = '50%';
            contenedorFigura.style.width = '150px';
            contenedorFigura.style.height = '150px';
            contenedorFigura.style.border = '5px solid black';
            break;
    }

    contenedorFigura.setAttribute('data-figura', figuraElegida);
    ultimaFigura = figuraElegida; // Actualizar la última figura seleccionada
}

function verificarRespuesta(respuesta) {
    if (gameOver) return; // Si el juego ha terminado, no se permiten más respuestas

    const figuraCorrecta = document.getElementById('figura').getAttribute('data-figura');
    const result = document.getElementById('result');

    if (respuesta === figuraCorrecta) {
        result.textContent = '¡Correcto! Felicitaciones.';
        result.style.color = "green";
        playAudio(felicidadesAudio); // Reproducir audio de felicitaciones
        gameOver = true; // Marcar el juego como terminado
        incrementarContadorFirebase("Infantil/Matemáticas/Geometría/FormasBásicas", "figurasgeometricas1");
        disableGuessButtons(); // Deshabilitar los botones de respuesta
    } else {
        result.textContent = `Incorrecto. La respuesta correcta era ${figuraCorrecta}.`;
        result.style.color = "red";
        playAudio(intentarAudio); // Reproducir audio de inténtalo de nuevo
        gameOver = true; // Marcar el juego como terminado
        incrementarContadorFirebase("Infantil/Matemáticas/Geometría/FormasBásicas", "figurasgeometricas1");
        disableGuessButtons(); // Deshabilitar los botones de respuesta
    }

    document.getElementById('reiniciar').style.display = 'block';
}

// Función para deshabilitar solo los botones de respuesta
function disableGuessButtons() {
    const guessButtons = document.querySelectorAll(".guess-button:not(#reiniciar)");
    guessButtons.forEach(button => {
        button.disabled = true;
    });
}

// Función para habilitar los botones de respuesta
function enableGuessButtons() {
    const guessButtons = document.querySelectorAll(".guess-button:not(#reiniciar)");
    guessButtons.forEach(button => {
        button.disabled = false;
    });
}

// Función para reproducir el sonido de la pregunta
function playAudioPregunta() {
    playAudio(audioPregunta);
}

// Función para reproducir el sonido correspondiente al icono de megáfono seleccionado
function playAudioFigura(figura) {
    let audioElement;
    switch (figura) {
        case 'Triángulo':
            audioElement = audioTriangulo;
            break;
        case 'Cuadrado':
            audioElement = audioCuadrado;
            break;
        case 'Círculo':
            audioElement = audioCirculo;
            break;
    }

    playAudio(audioElement);
}

// Función para reproducir audios si el sonido está activado
function playAudio(audioElement) {
    if (document.getElementById('sound-control').checked) {
        audioElement.play().then(() => {
            console.log('Audio reproducido correctamente');
        }).catch(error => {
            console.error('Error al reproducir el audio:', error);
        });
    }
}


// Llamar a la función para mostrar el contador al cargar la página
mostrarContador("Infantil/Matemáticas/Geometría/FormasBásicas", "figurasgeometricas1");
