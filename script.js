// You can add scroll animations or a preloader here later

window.addEventListener('scroll', () => {
  // Placeholder: Add any scroll-based animation logic
});

// JavaScript to dynamically change the text
const artText = document.querySelector('.art');
const words = ["Art", "Fun", "Inspiration", "Work"];
let currentWordIndex = 0;

// Function to change the text every 3 seconds
setInterval(() => {
  artText.textContent = words[currentWordIndex];
  currentWordIndex = (currentWordIndex + 1) % words.length;
}, 3000); // Change text every 3 seconds
