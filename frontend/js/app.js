import { initRouter } from "./router.js";
import { renderNavbar } from "./components/navbar.js";

document.addEventListener("DOMContentLoaded", () => {
  // Renderizamos la barra de navegación
  renderNavbar();

  // Renderizamos el contenedor principal si aún no está en el HTML
  if (!document.getElementById("app")) {
    const appContainer = document.createElement("div");
    appContainer.id = "app";
    document.body.appendChild(appContainer);
  }

  // Inicializamos el router
  initRouter();
});
