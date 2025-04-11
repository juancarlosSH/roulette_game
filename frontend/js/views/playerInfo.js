export function renderPlayerInfoView() {
  const container = document.createElement("div");
  container.classList.add("text-center");

  const heading = document.createElement("h1");
  heading.classList.add("mb-4");
  heading.textContent = "🧑 Información del Jugador";
  container.appendChild(heading);

  const paragraph = document.createElement("p");
  paragraph.textContent = "Aquí aparecerán tus datos, puntajes y estadísticas.";
  container.appendChild(paragraph);

  const card = document.createElement("div");
  card.classList.add("card", "mx-auto");
  card.style.maxWidth = "400px";

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = "Nombre: John Doe";

  const emailText = document.createElement("p");
  emailText.classList.add("card-text");
  emailText.textContent = "Email: johndoe@example.com";

  const scoreText = document.createElement("p");
  scoreText.classList.add("card-text");
  scoreText.textContent = "Puntaje más alto: 100";

  // Ensamblar la tarjeta
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(emailText);
  cardBody.appendChild(scoreText);
  card.appendChild(cardBody);

  container.appendChild(card);

  return container;
}
