import { initRouter } from "./router.js";
import { renderNavbar } from "./components/navbar.js";

document.addEventListener("DOMContentLoaded", () => {
  // Render the navigation bar
  renderNavbar();

  // Render the main container if it's not already in the HTML
  if (!document.getElementById("app")) {
    const appContainer = document.createElement("div");
    appContainer.id = "app";
    document.body.appendChild(appContainer);
  }

  // Initialize the router
  initRouter();
});
