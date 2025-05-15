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

// ===== Hover Glow Effect =====
document.querySelectorAll('.hover-btn').forEach(btn => {
  btn.addEventListener('mousemove', function (e) {
    const rect = btn.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    btn.style.setProperty('--glow-x', `${x}%`);
    btn.style.setProperty('--glow-y', `${y}%`);
  });

  btn.addEventListener('mouseleave', function () {
    btn.style.setProperty('--glow-x', `50%`);
    btn.style.setProperty('--glow-y', `50%`);
  });
});
