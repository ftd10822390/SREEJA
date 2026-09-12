const screens = document.querySelectorAll(".screen");

const song1 = document.getElementById("song1");
const song2 = document.getElementById("song2");
const song3 = document.getElementById("song3");

let currentSong = null;

// -------------------------
// Star generator
// -------------------------

const starsContainer = document.getElementById("stars");

for (let i = 0; i < 180; i++) {
  const star = document.createElement("div");

  star.classList.add("star");

  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";

  const size = Math.random() * 2.5 + 1;
  star.style.width = size + "px";
  star.style.height = size + "px";

  star.style.animationDelay = Math.random() * 3 + "s";
  star.style.animationDuration =
    Math.random() * 3 + 2 + "s";

  starsContainer.appendChild(star);
}

// -------------------------
// Shooting stars
// -------------------------

function createShootingStar() {
  const shootingStar = document.createElement("div");

  shootingStar.classList.add("shooting-star");

  shootingStar.style.left =
    Math.random() * 100 + "%";

  shootingStar.style.top =
    Math.random() * 45 + "%";

  starsContainer.appendChild(shootingStar);

  setTimeout(() => {
    shootingStar.remove();
  }, 6000);
}

setInterval(createShootingStar, 7000);

// -------------------------
// Music
// -------------------------

function stopAllSongs() {
  [song1, song2, song3].forEach(song => {
    song.pause();
  });
}

function playSong(song) {
  if (currentSong === song) return;

  stopAllSongs();

  currentSong = song;

  song.currentTime = 0;

  song.play().catch(() => {
    console.log("Music will start after user interaction.");
  });
}

// -------------------------
// Show sections
// -------------------------

function showSection(sectionId) {

  screens.forEach(screen => {
    screen.classList.add("hidden");
  });

  const section = document.getElementById(sectionId);

  if (section) {
    section.classList.remove("hidden");

    section.style.opacity = "0";
    section.style.transform = "scale(0.96)";

    setTimeout(() => {
      section.style.opacity = "1";
      section.style.transform = "scale(1)";
    }, 50);
  }

  // Music mapping

  if (sectionId === "story") {
    playSong(song2);
  }

  if (sectionId === "memories") {
    playSong(song3);
  }
}

// -------------------------
// Enter button
// -------------------------

const enterButton = document.getElementById("enterBtn");

enterButton.addEventListener("click", () => {

  // Song 1 starts only after clicking Enter
  playSong(song1);

  showSection("intro");

});
