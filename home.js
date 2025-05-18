// ===== Word Rotation ("Art" Text) =====
const artText = document.querySelector('.art');
const words = ["Art", "Fun", "Design", "Work"];
let currentWordIndex = 0;

setInterval(() => {
  if (artText) {
    artText.textContent = words[currentWordIndex];
    currentWordIndex = (currentWordIndex + 1) % words.length;
  }
}, 250);

