export class ProfileView {
  constructor() {}

  _render() {
    const elProfileContainer = document.createElement("div");
    elProfileContainer.classList.add("container", "py-4");
    const elProfileTitle = document.createElement("h1");
    elProfileTitle.innerText = "Welcome to the Profile Page";
    elProfileContainer.appendChild(elProfileTitle);
    return elProfileContainer;
  }
}
