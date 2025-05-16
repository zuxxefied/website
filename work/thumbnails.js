// Fetch thumbnails.json from current directory
fetch("thumbnails.json")
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(images => {
    const container = document.getElementById("thumbnails-container");
    if (!container) return;

    images.forEach(image => {
      const div = document.createElement("div");
      div.className = "work-item";
      div.innerHTML = `
        <img src="thumbnails/${image}" alt="${image}" loading="lazy" />
        <div class="thumbnails-overlay"><p>${image.replace(/\.[^/.]+$/, "")}</p></div>
      `;
      container.appendChild(div);
    });

    setupLightbox();
  })
  .catch(e => {
    console.error("Error loading thumbnails.json:", e);
  });

// Lightbox setup function
function setupLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

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
}
