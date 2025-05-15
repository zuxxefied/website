document.addEventListener("DOMContentLoaded", () => {
  // ===== Check for required variables =====
  if (typeof images !== "undefined" && typeof container !== "undefined") {
    images.forEach(image => {
      const div = document.createElement("div");
      div.className = "work-item";
      div.innerHTML = `
        <img src="posters/${image}" alt="${image}" loading="lazy" />
        <div class="poster-overlay"><p>${image.replace(/\.[^/.]+$/, "")}</p></div>
      `;
      container.appendChild(div);
    });
  }

  // ===== Scramble Title Animation =====
  const scrambleTitle = document.getElementById("scramble-title");
  if (scrambleTitle) {
    const original = scrambleTitle.textContent;
    const chars = "_______%";
    let interval = null;

    scrambleTitle.addEventListener("mouseenter", () => {
      let iteration = 0;
      clearInterval(interval);

      interval = setInterval(() => {
        scrambleTitle.textContent = original
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) return original[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        if (iteration >= original.length) {
          clearInterval(interval);
          scrambleTitle.textContent = original;
        }
        iteration += 0.25;
      }, 20);
    });

    scrambleTitle.addEventListener("mouseleave", () => {
      clearInterval(interval);
      scrambleTitle.textContent = original;
    });
  }

  // ===== Lightbox Setup =====
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  if (lightbox) lightbox.style.display = 'none';

  document.querySelectorAll('.work-item img').forEach(img => {
    img.addEventListener('click', () => {
      if (lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.style.display = 'flex';
      }
    });
  });

  if (lightbox && lightboxImg) {
    lightbox.addEventListener('click', () => {
      lightbox.style.display = 'none';
      lightboxImg.src = '';
    });
  }

  // ===== Word Rotation ("Art" Text) =====
  const artText = document.querySelector('.art');
  const words = ["Art", "Fun", "Design", "Work"];
  let currentWordIndex = 0;

  setInterval(() => {
    if (artText) {
      artText.textContent = words[currentWordIndex];
      currentWordIndex = (currentWordIndex + 1) % words.length;
    }
  }, 250); // 1 second per word

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

  // ===== Mobile Menu Toggle =====
  const menuIcon = document.querySelector('.menu-icon');
  if (menuIcon) {
    menuIcon.addEventListener('click', () => {
      alert("Menu button clicked!");
    });
  }
});

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
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (lightbox && lightboxImg) {
      lightbox.style.display = 'none';
      lightboxImg.src = '';
    }
  }
});
