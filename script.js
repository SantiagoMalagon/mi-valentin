// ELEMENTOS
const screens = {
    intro: document.getElementById('intro-screen'),
    transition: document.getElementById('transition-screen'),
    question: document.getElementById('question-screen'),
    success: document.getElementById('success-screen')
};

const buttons = {
    yes: document.getElementById('yes-btn'),
    no: document.getElementById('no-btn')
};

// DATOS URL
const urlParams = new URLSearchParams(window.location.search);
const fromName = decodeURIComponent(urlParams.get('from') || 'Santiago');
const toName = decodeURIComponent(urlParams.get('to') || 'La patrona');

// LLENAR TEXTOS
document.getElementById('recipient-name').innerText = toName;
document.getElementById('recipient-final').innerText = toName;
document.getElementById('recipient-final-2').innerText = toName;
document.getElementById('sender-name').innerText = fromName;
// Llenar footers
['sender-footer', 'sender-footer-2', 'sender-footer-3', 'sender-footer-4'].forEach(id => {
    document.getElementById(id).innerText = fromName;
});

// --- SECUENCIA DE PANTALLAS ---

// 1. CLICK EN INTRO -> VA A TRANSICIÓN
function startSequence() {
    screens.intro.classList.add('hidden');
    screens.transition.classList.remove('hidden');
    
    // Opcional: Iniciar música aquí si tienes el archivo
    // document.getElementById('bg-music').play().catch(e => console.log("Click para audio requerido"));

    // Esperar 3.5 segundos en la pantalla del perrito y pasar a la pregunta
    setTimeout(() => {
        screens.transition.classList.add('hidden');
        screens.question.classList.remove('hidden');
    }, 3500);
}

// Escuchar click/tap en la intro
screens.intro.addEventListener('click', startSequence);
screens.intro.addEventListener('touchstart', startSequence);


// 2. BOTÓN "NO" ESCAPISTA
const moveNoButton = (e) => {
    e.preventDefault(); // Evitar click en touch
    const container = document.querySelector('.card');
    const containerRect = container.getBoundingClientRect();
    
    // Límites (pantalla completa)
    const maxX = window.innerWidth - buttons.no.offsetWidth - 20;
    const maxY = window.innerHeight - buttons.no.offsetHeight - 20;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    buttons.no.style.position = 'fixed';
    buttons.no.style.left = `${x}px`;
    buttons.no.style.top = `${y}px`;
};

buttons.no.addEventListener('mouseover', moveNoButton);
buttons.no.addEventListener('touchstart', moveNoButton);

// 3. BOTÓN "SÍ" -> FINAL
buttons.yes.addEventListener('click', () => {
    screens.question.classList.add('hidden');
    screens.success.classList.remove('hidden');
    // Aquí puedes lanzar confeti extra si quieres
});
