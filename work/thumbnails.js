// Example for thumbnails.js or posters.js
fetch("thumbnails.json") // or "posters.json"
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  })
  .then(images => {
    const container = document.getElementById("thumbnails-container"); // or "poster-container"
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

    // Call the global setupLightbox after images are rendered
    if (typeof setupLightbox === "function") setupLightbox();
  })
  .catch(e => {
    console.error("Error loading thumbnails.json:", e);
  });