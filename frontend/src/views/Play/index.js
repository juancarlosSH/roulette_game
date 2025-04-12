export function renderPlayView() {
  const container = document.createElement("div");
  container.classList.add("text-center");

  const heading = document.createElement("h1");
  heading.classList.add("mb-4");
  heading.textContent = "🎲 Play";
  container.appendChild(heading);

  const paragraph = document.createElement("p");
  paragraph.textContent = "Here you can start a new game. Good luck!";
  container.appendChild(paragraph);

  const button = document.createElement("button");
  button.classList.add("btn", "btn-primary", "mt-3");
  button.textContent = "Start Game";
  container.appendChild(button);

  return container;
}
