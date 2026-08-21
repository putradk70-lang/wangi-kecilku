document.addEventListener("DOMContentLoaded", () => {

    const intro = document.getElementById("intro");
    const slider = document.getElementById("slider");
    const nav = document.getElementById("nav");
    const music = document.getElementById("music");
    const particles = document.getElementById("particles");

    /* Background Particles */
    function createBackground() {

        if (!particles) return;

        for (let i = 0; i < 60; i++) {
            const star = document.createElement("div");
            star.className = "particle";
            star.textContent = "✨";
            star.style.left = Math.random() * 100 + "%";
            star.style.top = Math.random() * 100 + "%";
            star.style.fontSize = (8 + Math.random() * 8) + "px";
            particles.appendChild(star);
        }

        setInterval(() => {
            const petal = document.createElement("div");
            petal.className = "particle";
            petal.textContent = "🌸";
            petal.style.left = Math.random() * 100 + "%";
            petal.style.top = "-20px";
            petal.style.animationDuration = (5 + Math.random() * 4) + "s";
            particles.appendChild(petal);

            setTimeout(() => petal.remove(), 9000);
        }, 400);
    }

    createBackground();

    /* Slider */
    const slides = [...document.querySelectorAll(".slide")];
    const dots = document.getElementById("dots");

    let currentSlide = 0;

    slides.forEach((_, i) => {
        const dot = document.createElement("div");
        dot.className = "dot" + (i === 0 ? " active" : "");
        dot.onclick = () => showSlide(i);
        dots.appendChild(dot);
    });

    function showSlide(index) {
        currentSlide = (index + slides.length) % slides.length;

        slides.forEach((s, i) => {
            s.classList.toggle("active", i === currentSlide);
        });

        [...dots.children].forEach((d, i) => {
            d.classList.toggle("active", i === currentSlide);
        });
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    /* Musik */
    function playMusic() {
        if (music) music.play().catch(() => {});
    }

    /* Amplop */
    function openEnvelope() {

        document.querySelector(".envelope")?.classList.add("open");

        setTimeout(() => {
            intro?.classList.add("hidden");
            slider?.classList.remove("hidden");
            nav?.classList.remove("hidden");
            playMusic();
        }, 900);
    }

    /* Efek buka paket */
    function reveal() {

        const flash = document.createElement("div");
        flash.className = "flash";
        document.body.appendChild(flash);

        flash.animate(
            [
                { opacity: 0 },
                { opacity: 1 },
                { opacity: 0 }
            ],
            { duration: 800 }
        );

        setTimeout(() => flash.remove(), 800);

        if (!particles) return;

        for (let i = 0; i < 80; i++) {

            const h = document.createElement("div");
            h.className = "particle";
            h.textContent = Math.random() > .5 ? "❤️" : "✨";
            h.style.left = Math.random() * 100 + "%";
            h.style.top = "-20px";
            h.style.animationDuration = (2 + Math.random() * 2) + "s";

            particles.appendChild(h);

            setTimeout(() => h.remove(), 4000);
        }
    }

    /* Swipe HP */
    let startX = 0;

    document.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    document.addEventListener("touchend", e => {

        const diff = e.changedTouches[0].clientX - startX;

        if (Math.abs(diff) > 50) {
            diff < 0 ? nextSlide() : prevSlide();
        }
    });

    /* Keyboard */
    document.addEventListener("keydown", e => {
        if (e.key === "ArrowRight") nextSlide();
        if (e.key === "ArrowLeft") prevSlide();
    });

    /* Supaya tombol HTML bisa memanggil fungsi */
    window.openEnvelope = openEnvelope;
    window.nextSlide = nextSlide;
    window.prevSlide = prevSlide;
    window.reveal = reveal;
    window.playMusic = playMusic;
});
