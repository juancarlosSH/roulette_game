export class NotFoundView {
  /**
   * NotFoundView constructor.
   */
  constructor() {
    this._render();
  }

  /**
   *
   * @returns {HTMLElement} - The NotFoundView element.
   */
  _render() {
    const elNotFoundView = document.createElement("div");
    elNotFoundView.className = "container text-center py-5";

    const elTitle = document.createElement("h1");
    elTitle.textContent = "404 - Page Not Found";
    elTitle.className = "text-danger mb-4";

    const elMessage = document.createElement("p");
    elMessage.textContent = "The requested page could not be found.";
    elMessage.className = "lead";

    const elHomeLink = document.createElement("a");
    elHomeLink.href = "/";
    elHomeLink.textContent = "Go to Home";
    elHomeLink.className = "btn btn-primary mt-3";
    elHomeLink.setAttribute("data-link", "");

    elNotFoundView.appendChild(elTitle);
    elNotFoundView.appendChild(elMessage);
    elNotFoundView.appendChild(elHomeLink);

    return elNotFoundView;
  }
}
