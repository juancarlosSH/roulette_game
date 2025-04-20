export class LeaderboardView {
  constructor() {}

  _render() {
    const elLeaderboarContainer = document.createElement("div");
    elLeaderboarContainer.classList.add("container", "py-4");
    const elLeaderboarTitle = document.createElement("h1");
    elLeaderboarTitle.innerText = "Welcome to the Leaderboard Page";
    elLeaderboarContainer.appendChild(elLeaderboarTitle);
    return elLeaderboarContainer;
  }
}
