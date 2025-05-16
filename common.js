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
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (lightbox && lightboxImg) {
      lightbox.classList.remove('show');
      lightboxImg.src = '';
    }
  }
});

// ===== Mobile Menu Toggle =====
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (toggle && mobileMenu) {
    const toggleMenu = () => {
      mobileMenu.classList.toggle('active');
      toggle.classList.toggle('open');
    };

    // Click toggle
    toggle.addEventListener('click', toggleMenu);

    // Optional: Toggle with Enter key (accessibility)
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        toggleMenu();
      }
    });

    // Close menu when clicking any link inside
    document.querySelectorAll('.mobile-menu .nav-btn, .mobile-menu a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        toggle.classList.remove('open');
      });
    });
  }
});

// ===== Lightbox Setup =====
function setupLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = lightbox ? lightbox.querySelector('.close-btn') : null;

  if (!lightbox || !lightboxImg) return;

  // Remove previous listeners to avoid duplicates
  document.querySelectorAll('.work-item img').forEach(img => {
    img.onclick = null;
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('show');
    });
  });

  // Close on background or close button click
  lightbox.onclick = (e) => {
    if (e.target === lightbox || (closeBtn && e.target === closeBtn)) {
      lightbox.classList.remove('show');
      lightboxImg.src = '';
    }
  };
}