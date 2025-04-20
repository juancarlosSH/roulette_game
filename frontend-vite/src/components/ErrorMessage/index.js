export class ErrorMessage {
  /** Error message. */
  sErrorMessage = "";

  /**
   * ErrorMessage constructor.
   * @param {String} sErrorMessage - Error message to display.
   */
  constructor(sErrorMessage) {
    this.sErrorMessage = sErrorMessage;
    this._render();
  }

  _render() {
    // Create error UI elements
    const elAlertDiv = document.createElement("div");
    const elHeading = document.createElement("h2");
    const elMessage = document.createElement("p");
    const elReloadButton = document.createElement("button");

    // Set attributes and classes
    elAlertDiv.className = "alert alert-danger m-4";
    elHeading.textContent = "Application Error";
    elMessage.textContent = this.sErrorMessage;
    elReloadButton.className = "btn btn-sm btn-outline-danger";
    elReloadButton.textContent = "Reload Page";

    // Set button action to reload the page
    elReloadButton.onclick = () => location.reload();

    // Append elements to the alert div
    elAlertDiv.appendChild(elHeading);
    elAlertDiv.appendChild(elMessage);
    elAlertDiv.appendChild(elReloadButton);

    // Clear the body and append the alert div
    document.body.textContent = "";
    document.body.appendChild(elAlertDiv);
  }
}
