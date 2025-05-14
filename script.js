// ===== Scroll animation placeholder =====
window.addEventListener('scroll', () => {
  // Add any scroll-based animations here
});

// ===== Dynamic "art" word rotation =====
const artText = document.querySelector('.art');
const words = ["Art", "Fun", "Inspiration", "Work"];
let currentWordIndex = 0;

setInterval(() => {
  artText.textContent = words[currentWordIndex];
  currentWordIndex = (currentWordIndex + 1) % words.length;
}, 250);

// ===== Mobile Menu Toggle =====
const menuIcon = document.querySelector('.menu-icon');
const mobileMenu = document.querySelector('.mobile-menu');

menuIcon.addEventListener('click', () => {
  mobileMenu.classList.toggle('show');
});
