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
  listGroup.classList.add("list-group", "mx-auto");
  listGroup.style.maxWidth = "400px";

  // Try fetching the data and render the list of high scores
  try {
    const response = await fetch("http://localhost:3000/api/users/high-scores");
    if (!response.ok) throw new Error("Failed to fetch high scores");

    const users = await response.json();

    // Check if users are returned
    if (Array.isArray(users) && users.length > 0) {
      users.forEach((user) => {
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        listItem.textContent = `${user.name} - ${user.high_score} pts`;
        listGroup.appendChild(listItem);
      });
    } else {
      // Show a message if no users are found
      const noDataItem = document.createElement("li");
      noDataItem.classList.add("list-group-item", "text-warning");
      noDataItem.textContent = "No high scores available.";
      listGroup.appendChild(noDataItem);
    }
  } catch (error) {
    // Handle errors gracefully and add a fallback error message
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
