export function renderHomeView() {
  const container = document.createElement("div");
  container.classList.add("text-center");

  const heading = document.createElement("h1");
  heading.classList.add("mb-4");
  heading.textContent = "🎮 Bienvenido a Video Roulette Game";

  const paragraph = document.createElement("p");
  paragraph.textContent =
    "Explora el menú para jugar, ver tus puntajes o conocer tu perfil.";

  container.appendChild(heading);
  container.appendChild(paragraph);

  return container;
}
