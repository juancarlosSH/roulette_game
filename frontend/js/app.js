import { initRouter } from "./router.js";
import { renderNavbar } from "./components/navbar.js";

document.addEventListener("DOMContentLoaded", () => {
  // Render the navigation bar
  renderNavbar();

  // Check if the 'app' container exists, otherwise create it
  let appContainer = document.getElementById("app");
  if (!appContainer) {
    appContainer = document.createElement("div");
    appContainer.id = "app";
    document.body.appendChild(appContainer);
  }

  // Initialize the router
  initRouter();
});
