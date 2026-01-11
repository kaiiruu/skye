$(document).ready(function () {
  var envelope = $("#envelope");
  var btn_open = $("#open");
  var btn_reset = $("#reset");
  var music = document.getElementById("bg-music");
  var heartsInterval;

  // Set initial volume to 0 for fade-in
  music.volume = 0;

  // Envelope click
  envelope.click(function () {
    open();
  });
  btn_open.click(function () {
    open();
  });
  btn_reset.click(function () {
    close();
  });

  // ---------------- Music fade-in/out ----------------
  function fadeIn(audio, duration = 2000) {
    audio.currentTime = 0;
    audio.play();
    let step = 0.05;
    let intervalTime = duration * step;
    let fadeInInterval = setInterval(() => {
      if (audio.volume < 1) {
        audio.volume = Math.min(audio.volume + step, 1);
      } else {
        clearInterval(fadeInInterval);
      }
    }, intervalTime);
  }

  function fadeOut(audio, duration = 2000) {
    let step = 0.05;
    let intervalTime = duration * step;
    let fadeOutInterval = setInterval(() => {
      if (audio.volume > 0) {
        audio.volume = Math.max(audio.volume - step, 0);
      } else {
        audio.pause();
        clearInterval(fadeOutInterval);
      }
    }, intervalTime);
  }

  // ---------------- Floating hearts ----------------
  function createFloatingHeart() {
    var heart = document.createElement("div");
    heart.className = "heart";

    // Random horizontal position
    heart.style.left = Math.random() * window.innerWidth + "px";

    // Random size
    var size = 15 + Math.random() * 20; // 15px - 35px
    heart.style.width = size + "px";
    heart.style.height = size + "px";

    // Random float duration
    var duration = 4 + Math.random() * 3; // 4s - 7s
    heart.style.animationDuration = duration + "s";

    // Append to container
    document.querySelector(".floating-hearts").appendChild(heart);

    // Remove after animation ends
    setTimeout(() => heart.remove(), duration * 1000);
  }

  function startHearts() {
    heartsInterval = setInterval(createFloatingHeart, 400);
  }

  function stopHearts() {
    clearInterval(heartsInterval);
    document.querySelectorAll(".floating-hearts .heart").forEach(h => h.remove());
  }

  // ---------------- Envelope actions ----------------
  function open() {
    envelope.addClass("open").removeClass("close");
    fadeIn(music, 2000); // fade in music
    startHearts();       // start floating hearts
  }

  function close() {
    envelope.addClass("close").removeClass("open");
    fadeOut(music, 2000); // fade out music
    stopHearts();          // remove floating hearts
  }
});
