export class HomeView {
  constructor() {}

  _render() {
    const elHomeContainer = document.createElement("div");
    elHomeContainer.classList.add("container", "py-4");
    const elHomeTitle = document.createElement("h1");
    elHomeTitle.innerText = "Welcome to the Home Page";
    elHomeContainer.appendChild(elHomeTitle);
    return elHomeContainer;
  }
}
