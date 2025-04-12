export async function renderBestScoresView() {
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
  listGroup.classList.add("list-group", "mx-auto", "mb-4");
  listGroup.style.maxWidth = "400px";

  try {
    const response = await fetch("http://localhost:3000/api/games/top-scores");
    if (!response.ok) throw new Error("Failed to fetch high scores");

    const scores = await response.json();

    if (Array.isArray(scores) && scores.length > 0) {
      scores.forEach((entry, index) => {
        const listItem = document.createElement("li");
        listItem.classList.add(
          "list-group-item",
          "d-flex",
          "justify-content-between",
          "align-items-center"
        );

        // Ranking number + emoji
        let rankText = `${index + 1}°`;
        let medal = "";

        switch (index) {
          case 0:
            medal = "🥇";
            listItem.style.backgroundColor = "#ffd70033";
            break;
          case 1:
            medal = "🥈";
            listItem.style.backgroundColor = "#c0c0c033";
            break;
          case 2:
            medal = "🥉";
            listItem.style.backgroundColor = "#cd7f3233";
            break;
        }

        listItem.innerHTML = `
          <span>${medal} ${rankText} ${entry.name}</span>
          <span><strong>${entry.top_score}</strong> pts</span>
        `;

        listGroup.appendChild(listItem);
      });
    } else {
      const noDataItem = document.createElement("li");
      noDataItem.classList.add("list-group-item", "text-warning");
      noDataItem.textContent = "No high scores available.";
      listGroup.appendChild(noDataItem);
    }
  } catch (error) {
    const errorItem = document.createElement("li");
    errorItem.classList.add("list-group-item", "text-danger");
    errorItem.textContent =
      "Error loading high scores. Please try again later.";
    listGroup.appendChild(errorItem);
    console.error("Error fetching high scores:", error);
  }

  container.appendChild(listGroup);

  return container;
}
