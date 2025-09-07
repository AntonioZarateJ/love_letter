const envelope = document.getElementById("envelope");
const cover = document.getElementById("cover");
const clickHere = document.getElementsByClassName("clickHere")[0];
const letterSheet = document.getElementById("letterSheet");
const letter = document.getElementById("letter");
const shadowLetter = document.getElementById("shadowLetter");
const closeButton = document.getElementById("close-button");
const titleElement = document.getElementById('title');
const messageElement = document.getElementById('message');
const messageImageContainer = document.getElementById('message-image-container'); // Nueva referencia

let isLetterOpen = false;
let countdownInterval;
const titleText = 'Para ti mi corazon bonito, Iren 💖:';
const messageText = `
Tal vez no he sido la pareja perfecta, pero quiero que sepas cuánto significas para mí. 
Perdón si en algún momento te hice pensar demasiado o si llegué a causarte una lágrima, nunca fue mi intención.

Lo que sí te aseguro es que mi amor por ti nunca se ha disminuido ni un solo instante. Esta intensidad solo quiero dártela a ti y a nadie mas, y con lo que pasó me di cuenta -y reafirmé— cuánto te adoro, te sueño, te pienso y te extraño. Estoy más que seguro de que lo único que quiero es estar a tu lado. Eres y siempre serás mi todo, estás tatuada en mi vida y en mi corazón para siempre.

Quiero pedirte una nueva oportunidad, no solo para estar a tu lado, sino para demostrarte que juntos podemos superar cualquier obstáculo y cumplir esos sueños y promesas que planeamos con tanto amor, no pensemos que puede fallar de nuevo o se sienta que no es lo mismo, realmente también quiero que tu también te sientas tranquila y agusto con la relacióm. Entonces si me lo permites, me gustaría que mantengamos todas las promesas que un día comentamos y especialmente esa promesa que te hice con ese anillo, sé que tú trabajarás en tu persona y podras dar ese amor y cariño que siempre me dijiste que tu puedes dar y obviamente yo trabajare tambien con mis propios defectos.

Con esto viene una pregunta muy importante... 🤭
¿Aceptas de nuevo ser mi novia?
No hay nadie más con quien quiera compartir mis días, mis sueños, mis risas y hasta mis silencios.

Sabes que te amo más allá de lo imaginable.`;

const startDate = new Date('2025-03-27T00:00:00');

function updateCountdown() {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('countdown').innerHTML = `
        ${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos
    `;
}

function typeWriter(element, text, speed, onComplete) {
    let i = 0;
    element.innerHTML = '';
    element.classList.add('typing-cursor');

    function type() {
        if (i < text.length) {
            if (text.substring(i, i + 4).toLowerCase() === '<br>') {
                element.innerHTML += '<br>';
                i += 4;
            } else {
                element.innerHTML += text.charAt(i);
                i++;
            }
            setTimeout(type, speed);
        } else {
            element.classList.remove('typing-cursor');
            if (onComplete) {
                onComplete();
            }
        }
    }
    type();
}

function openLetter() {
    if (isLetterOpen) return;

    isLetterOpen = true;
    envelope.style.cursor = 'default';
    cover.classList.add("open");
    clickHere.style.display = "none";

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);

    setTimeout(() => {
        letterSheet.classList.add("zoomIn");
        letter.style.animation = 'none';
        shadowLetter.style.animation = 'none';

        typeWriter(titleElement, titleText, 100, () => {
            typeWriter(messageElement, messageText, 60, () => {
                // Al terminar de escribir el mensaje, muestra la imagen
                showMessageImage();
            });
        });

    }, 1000);
}

function showMessageImage() {
    if (messageImageContainer) {
        // Agrega la clase 'show' para que la opacidad cambie a 1
        messageImageContainer.classList.add('show');
    }
}

function closeLetter() {
    if (!isLetterOpen) return;

    isLetterOpen = false;

    clearInterval(countdownInterval);

    titleElement.innerHTML = '';
    messageElement.innerHTML = '';
    
    // Oculta la imagen al cerrar la carta
    if (messageImageContainer) {
        messageImageContainer.classList.remove('show');
    }

    letterSheet.classList.remove("zoomIn");
    setTimeout(() => {
        cover.classList.remove("open");
        clickHere.style.display = "block";
        envelope.style.cursor = 'pointer';

        letter.style.animation = 'letter-lift 3s ease-in-out infinite';
        shadowLetter.style.animation = 'shadow-lift 3s ease-in-out infinite';
    }, 500);
}

envelope.addEventListener('click', openLetter);
closeButton.addEventListener('click', (event) => {
    event.stopPropagation();
    closeLetter();
});