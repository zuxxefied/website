document.addEventListener("DOMContentLoaded", () => {

  images.forEach(image => {
  const div = document.createElement("div");
  div.className = "work-item";
  div.innerHTML = `
    <img src="posters/${image}" alt="${image}" loading="lazy" />
    <div class="poster-overlay"><p>${image.replace(/\.[^/.]+$/, "")}</p></div>
  `;
  container.appendChild(div);
  // ===== Preloader =====
  const loader = document.getElementById("loader");
  const mainContent = document.getElementById("main-content");

  if (mainContent) {
    mainContent.classList.add("blurred"); // Add blur initially
  }

    if (loader) loader.style.display = "none";
    if (mainContent) {
    mainContent.style.display = "block";
    mainContent.classList.remove("blurred");
  }

  // ===== Scramble Title Animation =====
  const el = document.getElementById("scramble-title");
  if (el) {
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
        iteration += 0.25;
      }, 20);
    });

    el.addEventListener("mouseleave", () => {
      clearInterval(interval);
      el.textContent = original;
    });
  }

  // ===== Lightbox Setup =====
  const gallery = document.querySelector('.work-gallery');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  if (lightbox) {
    lightbox.style.display = 'none';
  }

  if (gallery && lightbox && lightboxImg) {
    gallery.addEventListener('click', function (e) {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
        lightboxImg.src = e.target.getAttribute('src');
        lightboxImg.alt = e.target.getAttribute('alt');
        lightbox.style.display = 'flex';
      }
    });
  }
});

// ===== Lightbox Close Function =====
function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  if (lightbox && lightboxImg) {
    lightbox.style.display = 'none';
    lightboxImg.src = '';
  }
}

// ===== Scroll Reveal Animation =====
window.addEventListener('scroll', () => {
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
});

// ===== Escape Key to Close Lightbox =====
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});

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

// ===== Mobile Menu Toggle =====
const menuIcon = document.querySelector('.menu-icon');
if (menuIcon) {
  menuIcon.addEventListener('click', () => {
    alert("Menu button clicked!");
  });
}

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
