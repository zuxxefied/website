// Fetch posters.json from current directory
fetch("posters.json")
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(images => {
    const container = document.getElementById("poster-container");
    if (!container) return;

    images.forEach(image => {
      const div = document.createElement("div");
      div.className = "work-item";
      div.innerHTML = `
        <img src="posters/${image}" alt="${image}" loading="lazy" />
        <div class="poster-overlay"><p>${image.replace(/\.[^/.]+$/, "")}</p></div>
      `;
      container.appendChild(div);
    });

    // Call the global setupLightbox after images are rendered
    if (typeof setupLightbox === "function") setupLightbox();
  })
  .catch(e => {
    console.error("Error loading posters.json:", e);
  });