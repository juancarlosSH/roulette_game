export class ProfileView {
  constructor() {}

  _render() {
    const elContainer = document.createElement("div");
    elContainer.classList.add("text-center");

    const elHeading = document.createElement("h1");
    elHeading.classList.add("mb-4");
    elHeading.textContent = "🧑 Player Information";
    elContainer.appendChild(elHeading);

    const elParagraph = document.createElement("p");
    elParagraph.textContent =
      "Your data, scores, and statistics will appear here.";
    elContainer.appendChild(elParagraph);

    const elCard = document.createElement("div");
    elCard.classList.add("card", "mx-auto");
    elCard.style.maxWidth = "400px";

    const elCardBody = document.createElement("div");
    elCardBody.classList.add("card-body");

    const elCardTitle = document.createElement("h5");
    elCardTitle.classList.add("card-title");
    elCardTitle.textContent = "Name: John Doe";

    const elEmailText = document.createElement("p");
    elEmailText.classList.add("card-text");
    elEmailText.textContent = "Email: johndoe@example.com";

    const elScoreText = document.createElement("p");
    elScoreText.classList.add("card-text");
    elScoreText.textContent = "Highest Score: 100";

    elCardBody.appendChild(elCardTitle);
    elCardBody.appendChild(elEmailText);
    elCardBody.appendChild(elScoreText);
    elCard.appendChild(elCardBody);
    elContainer.appendChild(elCard);

    return elContainer;
  }
}
