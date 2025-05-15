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

if (menuIcon) {
  menuIcon.addEventListener('click', () => {
    alert("Menu button clicked! You can build a sliding menu or modal here.");
    // Or dynamically toggle a menu, e.g.:
    // document.querySelector('.mobile-menu').classList.toggle('open');
  });
}

document.querySelectorAll('.hover-btn').forEach(btn => {
  btn.addEventListener('mousemove', function(e) {
    const rect = btn.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    btn.style.setProperty('--glow-x', `${x}%`);
    btn.style.setProperty('--glow-y', `${y}%`);
  });
  btn.addEventListener('mouseleave', function() {
    btn.style.setProperty('--glow-x', `50%`);
    btn.style.setProperty('--glow-y', `50%`);
  });
});

document.addEventListener('DOMContentLoaded', function () {
  // Lightbox functionality for poster images
  const imgs = document.querySelectorAll('.work-item img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  if (imgs && lightbox && lightboxImg) {
    imgs.forEach(img => {
      img.addEventListener('click', function () {
        lightboxImg.src = this.src;
        lightbox.style.display = 'flex';
      });
    });

    lightbox.addEventListener('click', function () {
      lightbox.style.display = 'none';
      lightboxImg.src = '';
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("scramble-title");
  if (!el) return;

  const original = el.textContent;
  const chars = "_______%";
  let interval = null;

  el.addEventListener("mouseenter", () => {
    let iteration = 0;
    clearInterval(interval);

    interval = setInterval(() => {
      el.textContent = original
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < iteration) return original[i];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      if (iteration >= original.length) {
        clearInterval(interval);
        el.textContent = original;
      }
      iteration += 0.25; // Slower progress
      }, 20); // Slower interval (was 30)
  });

  el.addEventListener("mouseleave", () => {
    clearInterval(interval);
    el.textContent = original;
  });
});