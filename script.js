// ===== Scroll animation placeholder =====
window.addEventListener('scroll', () => {
  // Add any scroll-based animations here
});

// ===== Dynamic "art" word rotation =====
const artText = document.querySelector('.art');
const words = ["Art", "Fun", "Design", "Work"];
let currentWordIndex = 0;

setInterval(() => {
  artText.textContent = words[currentWordIndex];
  currentWordIndex = (currentWordIndex + 1) % words.length;
}, 250);

// ===== Mobile Menu Toggle (Optional Expansion) =====
const menuIcon = document.querySelector('.menu-icon');

menuIcon.addEventListener('click', () => {
  alert("Menu button clicked! You can build a sliding menu or modal here.");
  // Or dynamically toggle a menu, e.g.:
  // document.querySelector('.mobile-menu').classList.toggle('open');
});
