// ===== Variables =====
let points = 0;
const howl = document.getElementById("howl");
const iceCrack = document.getElementById("iceCrack");
const toggle = document.getElementById("soundToggle");
const logo = document.getElementById("wolfLogo");

const memeImg = document.getElementById("meme");
const newMemeBtn = document.getElementById("newMeme");
const submitMemeBtn = document.getElementById("submitMeme");
const pointsDisplay = document.getElementById("gamePoints");

// ===== Sound =====
toggle.onclick = () => {
  howl.paused ? howl.play() : howl.pause();
};

window.addEventListener('load', () => {
  logo.style.opacity = 1;
  setTimeout(()=>{ iceCrack.play(); }, 1800);
});

// ===== Scroll to presale =====
document.getElementById("scrollPresale").onclick = () => {
  document.getElementById("presaleSection").scrollIntoView({ behavior: "smooth" });
};

// ===== Countdown =====
const timer = document.getElementById("timer");
let days = 40;
setInterval(()=>{
  days--; if(days<0) days=0;
  timer.textContent = days + " : 00 : 00 : 00";
}, 86400000);

// ===== Meme Generator =====
function fetchMeme() {
  fetch('https://meme-api.com/gimme')
    .then(res => res.json())
    .then(data => { memeImg.src = data.url; });
}
window.onload = fetchMeme;
newMemeBtn.onclick = fetchMeme;

submitMemeBtn.onclick = () => {
  points += 10;
  pointsDisplay.textContent = "Points: " + points;
  alert("Meme submitted! +10 $WOLF 🐺");
};

// ===== Mini Games =====
document.getElementById("raidMoon").onclick = () => {
  points += 5; pointsDisplay.textContent = "Points: " + points;
};
document.getElementById("packHunt").onclick = () => {
  points += 7; pointsDisplay.textContent = "Points: " + points;
};