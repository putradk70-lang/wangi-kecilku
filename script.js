/* =========================================
   Wangi Kecilku ❤️ - Cinematic Script
========================================= */

const intro = document.getElementById("intro");
const slider = document.getElementById("slider");
const nav = document.getElementById("nav");
const music = document.getElementById("music");
const particles = document.getElementById("particles");

/* =========================
   Background Particles
========================= */

function createBackground() {

    // Bintang
    for (let i = 0; i < 60; i++) {

        const star = document.createElement("div");
        star.className = "particle";
        star.textContent = "✨";

        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";
        star.style.opacity = Math.random() * .8 + .2;
        star.style.fontSize = Math.random() * 10 + 8 + "px";
        star.style.animationDuration = (4 + Math.random() * 3) + "s";

        particles.appendChild(star);
    }

    // Kelopak bunga
    setInterval(() => {

        const petal = document.createElement("div");

        petal.className = "particle";
        petal.textContent = "🌸";

        petal.style.left = Math.random() * 100 + "%";
        petal.style.top = "-30px";
        petal.style.fontSize = (18 + Math.random() * 12) + "px";
        petal.style.animationDuration = (5 + Math.random() * 5) + "s";

        particles.appendChild(petal);

        setTimeout(() => petal.remove(), 10000);

    }, 400);
}

createBackground();

/* =========================
   Amplop Pembuka
========================= */

function openEnvelope() {

    const envelope = document.querySelector(".envelope");

    envelope.classList.add("open");

    setTimeout(() => {

        intro.classList.add("hidden");
        slider.classList.remove("hidden");
        nav.classList.remove("hidden");

        music.play().catch(() => {});

    }, 900);
}

/* =========================
   Slider
========================= */

const slides = [...document.querySelectorAll(".slide")];
const dotsContainer = document.getElementById("dots");

let currentSlide = 0;

/* Buat dots */

slides.forEach((_, index) => {

    const dot = document.createElement("div");

    dot.className = "dot";

    if (index === 0)
        dot.classList.add("active");

    dot.onclick = () => showSlide(index);

    dotsContainer.appendChild(dot);
});

/* Tampilkan slide */

function showSlide(index) {

    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {

        slide.classList.toggle("active", i === currentSlide);
    });

    [...dotsContainer.children].forEach((dot, i) => {

        dot.classList.toggle("active", i === currentSlide);
    });
}

/* Next & Prev */

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

/* =========================
   Swipe HP
========================= */

let startX = 0;

document.addEventListener("touchstart", e => {

    startX = e.touches[0].clientX;

}, { passive: true });

document.addEventListener("touchend", e => {

    const diff = e.changedTouches[0].clientX - startX;

    if (Math.abs(diff) > 50) {

        if (diff < 0)
            nextSlide();
        else
            prevSlide();
    }

});

/* =========================
   Keyboard
========================= */

document.addEventListener("keydown", e => {

    if (e.key === "ArrowRight")
        nextSlide();

    if (e.key === "ArrowLeft")
        prevSlide();
});

/* =========================
   Reveal Paket
========================= */

function reveal() {

    // Flash putih
    const flash = document.createElement("div");

    flash.className = "flash";

    document.body.appendChild(flash);

    flash.animate(
        [
            { opacity: 0 },
            { opacity: .9 },
            { opacity: 0 }
        ],
        {
            duration: 900,
            easing: "ease-out"
        }
    );

    setTimeout(() => flash.remove(), 900);

    // Hati & glitter
    for (let i = 0; i < 90; i++) {

        const heart = document.createElement("div");

        heart.className = "particle";

        heart.textContent = Math.random() > .5 ? "❤️" : "✨";

        heart.style.left = Math.random() * 100 + "%";
        heart.style.top = "-30px";
        heart.style.fontSize = (18 + Math.random() * 16) + "px";
        heart.style.animationDuration = (2 + Math.random() * 2) + "s";

        particles.appendChild(heart);

        setTimeout(() => heart.remove(), 4500);
    }

    // Getar ringan HP (jika support)
    if (navigator.vibrate) {

        navigator.vibrate([120, 80, 120]);
    }
}

/* =========================
   Auto Play Musik
========================= */

music.volume = 0.35;

/* Fade in musik */

music.addEventListener("play", () => {

    let vol = 0;

    music.volume = 0;

    const fade = setInterval(() => {

        vol += 0.03;

        if (vol >= 0.35) {

            music.volume = 0.35;
            clearInterval(fade);
        } else {

            music.volume = vol;
        }

    }, 120);
});