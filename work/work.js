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

// ===== Mobile Menu Alert (optional) =====
const menuIcon = document.querySelector('.menu-icon');
if (menuIcon) {
  menuIcon.addEventListener('click', () => {
    alert("Menu button clicked!");
  });
}
