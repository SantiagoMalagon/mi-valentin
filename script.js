// --- CONFIGURACIÓN Y ELEMENTOS ---
const elements = {
    introScreen: document.getElementById('intro-screen'),
    questionScreen: document.getElementById('question-screen'),
    successScreen: document.getElementById('success-screen'),
    yesBtn: document.getElementById('yes-btn'),
    noBtn: document.getElementById('no-btn'),
    recipientName: document.getElementById('recipient-name'),
    recipientFinal: document.getElementById('recipient-final'),
    senderName: document.getElementById('sender-name'),
    celebrationContainer: document.getElementById('celebration-container')
};

// --- 1. INICIALIZACIÓN (Leer nombres de la URL) ---
const urlParams = new URLSearchParams(window.location.search);
// Usamos decodeURIComponent para que los tildes y espacios se vean bien
const fromName = decodeURIComponent(urlParams.get('from') || 'Tu Admirador');
const toName = decodeURIComponent(urlParams.get('to') || 'Persona Especial');

elements.recipientName.innerText = toName;
elements.recipientFinal.innerText = toName;
elements.senderName.innerText = fromName;

// --- 2. CONTROL DE PANTALLAS ---
let gameStarted = false;
function startGame() {
    if (gameStarted) return;
    gameStarted = true;
    // Pequeño delay para la transición
    elements.introScreen.style.opacity = '0';
    setTimeout(() => {
        elements.introScreen.classList.add('hidden');
        elements.questionScreen.classList.remove('hidden');
    }, 500);
}
// Iniciar con cualquier interacción
document.addEventListener('keydown', startGame, { once: true });
document.addEventListener('click', startGame, { once: true });
document.addEventListener('touchstart', startGame, { once: true });


// --- 3. LÓGICA DEL BOTÓN "SÍ" ---
elements.yesBtn.addEventListener('click', () => {
    elements.questionScreen.style.transform = 'scale(1.1)';
    elements.questionScreen.style.opacity = '0';
    
    setTimeout(() => {
        elements.questionScreen.classList.add('hidden');
        elements.successScreen.classList.remove('hidden');
        celebrateSuccess(); // ¡Lanzar confeti de corazones!
    }, 500);
});


// --- 4. LÓGICA DEL BOTÓN "NO" (IMPOSIBLE) ---
// Usamos mouseover (PC) y touchstart (Móvil) antes de que puedan hacer click
['mouseover', 'touchstart'].forEach(eventType => {
    elements.noBtn.addEventListener(eventType, (e) => {
        e.preventDefault(); // Evitar comportamientos por defecto en móvil
        moveButton(e.target);
    });
});

function moveButton(btn) {
    // Área segura (margen) para que no se salga totalmente de la pantalla
    const margin = 30; 
    const maxWidth = window.innerWidth - btn.offsetWidth - margin;
    const maxHeight = window.innerHeight - btn.offsetHeight - margin;

    // Generar nueva posición aleatoria dentro de los límites seguros
    // Math.max(margin, ...) asegura que no se vaya muy a la izquierda/arriba
    const newX = Math.max(margin, Math.random() * maxWidth);
    const newY = Math.max(margin, Math.random() * maxHeight);

    // Aplicar movimiento
    btn.style.position = 'fixed'; // Asegurar que sea fixed al moverse
    btn.style.left = newX + 'px';
    btn.style.top = newY + 'px';
    
    // Añadir un pequeño giro divertido
    const randomRot = (Math.random() - 0.5) * 30;
    btn.style.transform = `rotate(${randomRot}deg) scale(0.9)`;
    setTimeout(() => { btn.style.transform = 'rotate(0deg) scale(1)'; }, 200);
}


// --- 5. EFECTO DE CELEBRACIÓN (Corazones flotantes) ---
function celebrateSuccess() {
    // Crear 50 corazones en intervalos
    let count = 0;
    const interval = setInterval(() => {
        createFloatingHeart();
        count++;
        if (count > 50) clearInterval(interval);
    }, 100);
}

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = ['❤️', '💖', '💕', '💘', '💝'][Math.floor(Math.random() * 5)];
    heart.classList.add('floating-heart');
    
    // Posición inicial aleatoria en la parte inferior
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.bottom = '-50px';
    
    // Variables CSS personalizadas para la animación
    const duration = Math.random() * 3 + 2 + 's'; // Entre 2 y 5 segundos
    const travelDist = -(Math.random() * 500 + 300) + 'px'; // Distancia hacia arriba
    const rotation = (Math.random() - 0.5) * 360 + 'deg';

    heart.style.setProperty('--duration', duration);
    heart.style.setProperty('--travel-dist', travelDist);
    heart.style.setProperty('--rotation', rotation);
    
    elements.celebrationContainer.appendChild(heart);
    
    // Eliminar el elemento después de que termine su animación
    setTimeout(() => {
        heart.remove();
    }, parseFloat(duration) * 1000);
}
