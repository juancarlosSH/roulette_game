export default function DescriptionSection() {
  const section = document.createElement("section");
  section.classList.add("col");

  const title = document.createElement("h1");
  title.classList.add("mb-4");
  title.textContent = "🎮 Video Roulette Game";
  section.appendChild(title);

  const description = document.createElement("p");
  description.textContent =
    "Welcome to Video Roulette! The game where you roll the dice to determine your score. Try to beat the highest score!";
  section.appendChild(description);

  const instructions = document.createElement("ul");
  instructions.classList.add("list-unstyled");

  const instructionItems = [
    "Start a game by clicking 'Start Game'.",
    "You will gain points based on your choices.",
    "The highest score will be shown on the leaderboard.",
  ];

  instructionItems.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    instructions.appendChild(listItem);
  });

  section.appendChild(instructions);

  const startButton = document.createElement("button");
  startButton.classList.add("btn", "btn-primary", "mt-1");
  startButton.textContent = "Start Game";
  startButton.onclick = () => {
    window.location.hash = "/play";
  };
  section.appendChild(startButton);

  return section;
}
