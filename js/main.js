// ======================
//   VARIABLES
// ======================
let points = 0;

const howl = document.getElementById("howl");
const iceCrack = document.getElementById("iceCrack");
const toggle = document.getElementById("soundToggle");
const logo = document.getElementById("wolfLogo");
const memeImg = document.getElementById("meme");
const newMemeBtn = document.getElementById("newMeme");
const submitMemeBtn = document.getElementById("submitMeme");
const pointsDisplay = document.getElementById("gamePoints");

// ======================
//   SOUND + LOGO ANIMATION
// ======================
toggle.onclick = () => {
    howl.paused ? howl.play() : howl.pause();
};

window.addEventListener("load", () => {
    logo.style.opacity = 1;
    setTimeout(() => {
        if (iceCrack) iceCrack.play();
    }, 1800);
});

// ======================
//   MEME GENERATOR
// ======================
function fetchMeme() {
    fetch("https://meme-api.com/gimme")
        .then(res => res.json())
        .then(data => {
            memeImg.src = data.url;
        })
        .catch(() => {
            memeImg.alt = "Could not load meme 😢";
        });
}

window.addEventListener("load", fetchMeme);
newMemeBtn.onclick = fetchMeme;

submitMemeBtn.onclick = () => {
    points += 10;
    pointsDisplay.textContent = "Points: " + points;
    alert("Meme submitted! +10 $WOLF points 🐺");
};

// ======================
//   MINI-GAMES
// ======================
document.getElementById("raidMoon").onclick = () => {
    points += 5;
    pointsDisplay.textContent = "Points: " + points;
};

document.getElementById("packHunt").onclick = () => {
    points += 7;
    pointsDisplay.textContent = "Points: " + points;
};

// ======================
//   SCROLL TO PRESALE
// ======================
const scrollBtn = document.getElementById("scrollPresale");
if (scrollBtn) {
    scrollBtn.onclick = () => {
        document.getElementById("presaleSection").scrollIntoView({ behavior: "smooth" });
    };
}

// ======================
//   LIVE COUNTDOWN (THIS PART WAS MISSING IN YOUR main.js)
// ======================
const presaleDate = Date.now() + (40 * 24 * 60 * 60 * 1000);

function updateCountdown() {
    const now = new Date().getTime();
    const t = presaleDate - now;

    const box = document.getElementById("presale-countdown");
    if (!box) return;

    if (t <= 0) {
        box.innerHTML = "Presale LIVE!";
        return;
    }

    const d = Math.floor(t / (1000 * 60 * 60 * 24));
    const h = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((t % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = d < 10 ? "0" + d : d;
    document.getElementById("hours").textContent = h < 10 ? "0" + h : h;
    document.getElementById("minutes").textContent = m < 10 ? "0" + m : m;
    document.getElementById("seconds").textContent = s < 10 ? "0" + s : s;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// =======================================================
//   WOLF RUNNER GAME (UNCHANGED, ADDED EXACTLY AS BEFORE)
// =======================================================
const miniGameSection = document.querySelector(".mini-games");

if (miniGameSection) {
    const wolfRunBtn = document.createElement("button");
    wolfRunBtn.id = "wolfRun";
    wolfRunBtn.textContent = "🐺 Wolf Runner Game";
    miniGameSection.appendChild(wolfRunBtn);

    wolfRunBtn.onclick = startWolfRunGame;
}

function startWolfRunGame() {
    const gameModal = document.createElement("div");
    gameModal.style.position = "fixed";
    gameModal.style.top = 0;
    gameModal.style.left = 0;
    gameModal.style.width = "100vw";
    gameModal.style.height = "100vh";
    gameModal.style.background = "rgba(0,0,0,0.85)";
    gameModal.style.display = "flex";
    gameModal.style.flexDirection = "column";
    gameModal.style.justifyContent = "center";
    gameModal.style.alignItems = "center";
    gameModal.style.zIndex = "999999";

    const exitBtn = document.createElement("button");
    exitBtn.textContent = "Exit Game";
    exitBtn.style.marginBottom = "10px";
    exitBtn.onclick = () => gameModal.remove();

    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");

    gameModal.appendChild(exitBtn);
    gameModal.appendChild(canvas);
    document.body.appendChild(gameModal);

    let wolf = { x: 40, y: 250, vy: 0, gravity: 0.6 };
    let obstacle = { x: 600, y: 260, width: 30, height: 30 };

    function jump() {
        if (wolf.y >= 250) wolf.vy = -12;
    }

    document.addEventListener("keydown", jump);

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        wolf.vy += wolf.gravity;
        wolf.y += wolf.vy;
        if (wolf.y > 250) wolf.y = 250;

        ctx.fillStyle = "#fff";
        ctx.fillRect(wolf.x, wolf.y, 40, 40);

        obstacle.x -= 6;
        if (obstacle.x < -30) {
            obstacle.x = 600;
            points += 3;
            pointsDisplay.textContent = "Points: " + points;
        }

        ctx.fillStyle = "red";
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        if (
            wolf.x < obstacle.x + obstacle.width &&
            wolf.x + 40 > obstacle.x &&
            wolf.y < obstacle.y + obstacle.height
        ) {
            alert("You crashed! Points added: 3");
            gameModal.remove();
            return;
        }

        requestAnimationFrame(loop);
    }

    loop();
}