document.addEventListener("DOMContentLoaded", () => {
  const scrambleTitle = document.getElementById("scramble-title");
  if (scrambleTitle) {
    const original = scrambleTitle.textContent;
    const chars = "____A___B___C___D___E___F___G___H___I___J___K___L___M___N___O___P___Q___R___S___T___U___V___W___X___Y___Z___a___b___c___d___e___f___g___h___i___j___k___l___m___n___o___p___q___r___s___t___u___v___w___x___y___z___0___1___2___3___4_____5___6___7___8___9";
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

  const menuIcon = document.querySelector('.menu-icon');
  if (menuIcon) {
    menuIcon.addEventListener('click', () => {
      alert("Menu button clicked!");
    });
  }
});
