export function renderBestScoresView() {
  const container = document.createElement("div");
  container.classList.add("text-center");

  const heading = document.createElement("h1");
  heading.classList.add("mb-4");
  heading.textContent = "🏆 High Scores";
  container.appendChild(heading);

  const paragraph = document.createElement("p");
  paragraph.textContent = "These are the players with the highest scores.";
  container.appendChild(paragraph);

  const listGroup = document.createElement("ul");
  listGroup.classList.add("list-group", "mx-auto");
  listGroup.style.maxWidth = "400px";

  // Create the list items
  const scores = [
    "Player 1 - 120 pts",
    "Player 2 - 110 pts",
    "Player 3 - 105 pts",
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
