export function renderHomeView() {
  const container = document.createElement("div");
  container.classList.add("text-center");

  const heading = document.createElement("h1");
  heading.classList.add("mb-4");
  heading.textContent = "🎮 Welcome to Video Roulette Game";

  const paragraph = document.createElement("p");
  paragraph.textContent =
    "Explore the menu to play, view your scores, or check your profile.";

  container.appendChild(heading);
  container.appendChild(paragraph);

  return container;
}
