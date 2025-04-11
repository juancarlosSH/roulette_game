export function renderBestScoresView() {
  const container = document.createElement("div");
  container.classList.add("text-center");

  const heading = document.createElement("h1");
  heading.classList.add("mb-4");
  heading.textContent = "🏆 Mejores Puntajes";
  container.appendChild(heading);

  const paragraph = document.createElement("p");
  paragraph.textContent = "Estos son los jugadores con los puntajes más altos.";
  container.appendChild(paragraph);

  const listGroup = document.createElement("ul");
  listGroup.classList.add("list-group", "mx-auto");
  listGroup.style.maxWidth = "400px";

  // Crear los elementos de la lista
  const scores = [
    "Jugador 1 - 120 pts",
    "Jugador 2 - 110 pts",
    "Jugador 3 - 105 pts",
  ];

  scores.forEach((score) => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.textContent = score;
    listGroup.appendChild(listItem);
  });

  container.appendChild(listGroup);

  return container;
}
