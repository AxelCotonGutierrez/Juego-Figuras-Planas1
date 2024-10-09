// Cargar archivos de audio para cada figura y felicitaciones
const audioPregunta = new Audio('https://raw.githubusercontent.com/AxelCotonGutierrez/Juego-Figuras-Planas1/master/audio/Pregunta.mp3');
const audioTriangulo = new Audio('https://raw.githubusercontent.com/AxelCotonGutierrez/Juego-Figuras-Planas1/master/audio/triangulo.mp3');
const audioCuadrado = new Audio('https://raw.githubusercontent.com/AxelCotonGutierrez/Juego-Figuras-Planas1/master/audio/cuadrado.mp3');
const audioCirculo = new Audio('https://raw.githubusercontent.com/AxelCotonGutierrez/Juego-Figuras-Planas1/master/audio/circulo.mp3');
const felicidadesAudio = new Audio('https://raw.githubusercontent.com/AxelCotonGutierrez/Juego-Figuras-Planas1/master/audio/Felicidades.mp3');

document.addEventListener('DOMContentLoaded', iniciarJuego);

let ultimaFigura = '';

function iniciarJuego() {
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
    const figuraCorrecta = document.getElementById('figura').getAttribute('data-figura');
    const result = document.getElementById('result');

    if (respuesta === figuraCorrecta) {
        result.textContent = '¡Correcto! Felicitaciones.';
        result.style.color = "green";
        playAudio(felicidadesAudio); // Reproducir audio de felicitaciones
    } else {
        result.textContent = `Incorrecto. La respuesta correcta era ${figuraCorrecta}.`;
        result.style.color = "red";
    }

    document.getElementById('reiniciar').style.display = 'block';
}

// Función para reproducir el sonido correspondiente al icono de megáfono seleccionado
function playAudioFigura(figura) {
    if (document.getElementById('sound-control').checked) {
        switch (figura) {
            case 'Triángulo':
                audioTriangulo.play();
                break;
            case 'Cuadrado':
                audioCuadrado.play();
                break;
            case 'Círculo':
                audioCirculo.play();
                break;
        }
    }
}


// Función para reproducir el sonido de la pregunta
function playAudioPregunta() {
    if (document.getElementById('sound-control').checked) {
        audioPregunta.play();
    }
}
