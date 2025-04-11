export function renderPlayView() {
  const container = document.createElement("div");
  container.classList.add("text-center");

  const heading = document.createElement("h1");
  heading.classList.add("mb-4");
  heading.textContent = "🎲 Jugar";
  container.appendChild(heading);

  const paragraph = document.createElement("p");
  paragraph.textContent =
    "Aquí podrás comenzar una nueva partida. ¡Buena suerte!";
  container.appendChild(paragraph);

  const button = document.createElement("button");
  button.classList.add("btn", "btn-primary", "mt-3");
  button.textContent = "Iniciar Juego";
  container.appendChild(button);

  return container;
}
