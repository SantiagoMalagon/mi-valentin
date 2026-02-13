// Obtener elementos del DOM
const introScreen = document.getElementById('intro-screen');
const questionScreen = document.getElementById('question-screen');
const successScreen = document.getElementById('success-screen');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');

// Elementos de texto
const recipientNameElement = document.getElementById('recipient-name');
const recipientFinalElement = document.getElementById('recipient-final');
const senderNameElement = document.getElementById('sender-name');

// 1. Lógica para obtener nombres de la URL (o usar por defecto)
const urlParams = new URLSearchParams(window.location.search);
const fromName = urlParams.get('from') || 'Tu Admirador'; // Valor por defecto
const toName = urlParams.get('to') || 'Persona Especial'; // Valor por defecto

// Insertar nombres en el HTML
recipientNameElement.innerText = toName;
recipientFinalElement.innerText = toName;
senderNameElement.innerText = fromName;

// 2. Pantalla de Intro -> Pregunta
document.addEventListener('keydown', startGame);
document.addEventListener('click', startGame);

let gameStarted = false;
function startGame() {
    if (gameStarted) return;
    gameStarted = true;
    
    introScreen.classList.add('hidden');
    questionScreen.classList.remove('hidden');
    
    // Aquí podrías reproducir música si quisieras
    // new Audio('musica.mp3').play();
}

// 3. Botón "Sí"
yesBtn.addEventListener('click', () => {
    questionScreen.classList.add('hidden');
    successScreen.classList.remove('hidden');
    launchConfetti(); // Efecto extra opcional
});

// 4. Botón "No" (se escapa)
noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', moveButton); // Para celular

function moveButton() {
    // Ancho y alto de la ventana disponible (menos márgenes)
    const container = document.querySelector('.card');
    const containerRect = container.getBoundingClientRect();
    
    // Calculamos límites para que no se salga demasiado de la tarjeta (opcional)
    // O dejamos que se mueva por toda la pantalla:
    const maxWidth = window.innerWidth - noBtn.offsetWidth - 20;
    const maxHeight = window.innerHeight - noBtn.offsetHeight - 20;

    const randomX = Math.random() * maxWidth;
    const randomY = Math.random() * maxHeight;

    // Aplicar nueva posición fixed para que se salga del flujo normal
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}