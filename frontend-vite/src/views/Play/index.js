export class PlayView {
  constructor() {}

  _render() {
    const elPlayContainer = document.createElement("div");
    elPlayContainer.classList.add("container", "py-4");
    const elPlayTitle = document.createElement("h1");
    elPlayTitle.innerText = "Welcome to the Play Page";
    elPlayContainer.appendChild(elPlayTitle);
    return elPlayContainer;
  }
}
