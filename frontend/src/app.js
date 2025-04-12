import { initRouter } from "./utils/router.js";
import { renderNavbar } from "./components/Navbar/index.js";

/**
 * Creates and shows an error UI
 * @param {Error} error
 */
const showErrorUI = (error) => {
  // Crear elementos
  const alertDiv = document.createElement("div");
  const heading = document.createElement("h2");
  const message = document.createElement("p");
  const reloadBtn = document.createElement("button");

  // Configurar atributos y clases
  alertDiv.className = "alert alert-danger m-4";
  heading.textContent = "Application Error";
  message.textContent = error.message;
  reloadBtn.className = "btn btn-sm btn-outline-danger";
  reloadBtn.textContent = "Reload Page";

  // Event listeners
  reloadBtn.addEventListener("click", () => window.location.reload());

  // Ensamblar estructura
  alertDiv.appendChild(heading);
  alertDiv.appendChild(message);
  alertDiv.appendChild(reloadBtn);

  // Limpiar body y añadir error
  document.body.textContent = "";
  document.body.appendChild(alertDiv);
};

/**
 * Main app initialization
 */
const initializeApp = () => {
  try {
    // 1. Render navbar
    const navbarContainer = document.getElementById("navbar");
    if (!navbarContainer) throw new Error("Navbar container not found");
    renderNavbar();

    // 2. Ensure app container exists
    let appContainer = document.getElementById("app");
    if (!appContainer) {
      appContainer = document.createElement("div");
      appContainer.id = "app";

      // Insertar en el main.container o body como fallback
      const mainContainer = document.querySelector("main.container");
      if (mainContainer) {
        mainContainer.appendChild(appContainer);
      } else {
        document.body.appendChild(appContainer);
      }
    }

    // 3. Initialize router
    initRouter();

    // 4. Remove loader if exists
    const loader = document.getElementById("loader");
    if (loader) loader.remove();
  } catch (error) {
    console.error("App initialization failed:", error);
    showErrorUI(error);
  }
};

// Start app when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}
