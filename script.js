// Configuration: Set the birthday date here
// Format: YYYY-MM-DDTHH:MM:SS
const targetDate = new Date();
targetDate.setSeconds(targetDate.getSeconds() + 1); // Test: 1 second from now

// --- Countdown Logic ---
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
        // Birthday has arrived!
        goToReveal();
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    daysEl.textContent = days.toString().padStart(2, '0');
    hoursEl.textContent = hours.toString().padStart(2, '0');
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
}

// Update every second
let countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// --- Navigation Logic ---
function showSection(id) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
        setTimeout(() => {
            if (!page.classList.contains('active')) {
                page.classList.add('hidden');
            }
        }, 500); // Wait for fade out
    });

    // Show target page
    const target = document.getElementById(id);
    target.classList.remove('hidden');
    // Small delay to allow display:flex to apply before opacity transition
    setTimeout(() => {
        target.classList.add('active');
    }, 50);
}

function goToReveal() {
    clearInterval(countdownInterval);
    showSection('reveal-page');
    createConfetti();

    // Play Music
    const audio = document.getElementById('bg-music');
    audio.play().catch(error => {
        console.log("Autoplay prevented:", error);
        // Optional: Show a "Play" button if blocked
        alert("Click anywhere to start the music! (Browser blocked autoplay)");
        document.body.addEventListener('click', () => {
            audio.play();
        }, { once: true });
    });
}

function goToCelebrate() {
    showSection('celebrate-page');
}

function goToLetter() {
    showSection('letter-page');
}

function goBackToCelebrate() {
    showSection('celebrate-page');
}

function goBackToReveal() {
    showSection('reveal-page');
}

// Make functions global so HTML can access them
window.goToReveal = goToReveal;
window.goToCelebrate = goToCelebrate;
window.goToLetter = goToLetter;
window.goToLetter = goToLetter;
window.goBackToCelebrate = goBackToCelebrate;
window.goBackToReveal = goBackToReveal;


// --- Floating Hearts Animation ---
const heartsContainer = document.getElementById('floatingHearts');

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerHTML = '❤️'; // Using emoji for simplicity and color

    // Random Position and Size
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 4 + 's'; // 4-7s float time
    heart.style.opacity = Math.random() * 0.5 + 0.3;
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';

    // Add custom keyframes for floating up
    heart.style.position = 'absolute';
    heart.style.bottom = '-50px';
    heart.style.animationName = 'floatUp';
    heart.style.animationTimingFunction = 'linear';

    heartsContainer.appendChild(heart);

    // Remove after animation
    setTimeout(() => {
        heart.remove();
    }, 7000);
}

// Add global style for floatUp if not present
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes floatUp {
    to {
        transform: translateY(-110vh) rotate(20deg);
        opacity: 0;
    }
}`;
document.head.appendChild(styleSheet);

setInterval(createHeart, 500);

// --- Simple Confetti Effect for Reveal ---
function createConfetti() {
    for (let i = 0; i < 50; i++) {
        setTimeout(createHeart, i * 50); // Burst of hearts
    }
}

// --- 3D Tilt Effect ---
const container = document.querySelector('.glass-container');

document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Calculate rotation (-15 to 15 degrees)
    const x = ((clientX / innerWidth) - 0.5) * 2; // -1 to 1
    const y = ((clientY / innerHeight) - 0.5) * 2; // -1 to 1

    const rotateY = x * 10;
    const rotateX = y * -10;

    container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

// Reset tilt on leave
document.addEventListener('mouseleave', () => {
    container.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
});

// --- Sparkles ---
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.top = Math.random() * 100 + 'vh';
    sparkle.style.animationDelay = Math.random() * 2 + 's';
    document.querySelector('.background-animation').appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 4000);
}

setInterval(createSparkle, 200);

// --- Candle Logic ---
function blowCandle() {
    const flame = document.getElementById('flame');
    if (!flame.classList.contains('off')) {
        flame.classList.add('off');
        createConfetti(); // Celebrate again!

        // Change instruction text
        document.querySelector('.instruction').textContent = "Because today,you deserve every dream Coming true.✨";
        document.querySelector('.celebrate-heading').textContent = "Wishes Made!";
    }
}
window.blowCandle = blowCandle;
