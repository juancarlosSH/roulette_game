import { renderHomeView } from "./views/home.js";
import { renderPlayView } from "./views/play.js";
import { renderBestScoresView } from "./views/bestScores.js";
import { renderPlayerInfoView } from "./views/playerInfo.js";

const routes = {
  "/": renderHomeView,
  "/play": renderPlayView,
  "/scores": renderBestScoresView,
  "/player": renderPlayerInfoView,
};

export function initRouter() {
  window.onpopstate = renderRoute; // Detecta cuando se navega hacia atrás o adelante
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      // Detecta los enlaces con el atributo data-link
      e.preventDefault(); // Previne la recarga completa de la página
      history.pushState(null, "", e.target.href); // Cambia la URL sin recargar
      renderRoute(); // Rendeiza la ruta actual
    }
  });
  renderRoute(); // Llama al renderizado de la vista inicial
}

async function renderRoute() {
  const path = window.location.pathname; // Obtiene el path actual de la URL
  const view = routes[path] || renderHomeView; // Obtiene la vista correspondiente, o usa home por defecto
  const appElement = document.getElementById("app");

  // Borra el contenido anterior antes de insertar el nuevo
  appElement.innerHTML = "";

  try {
    const viewElement = await view(); // Asegúrate de que la vista es una promesa que resuelve un elemento DOM
    appElement.appendChild(viewElement); // Añade el contenido de la vista
  } catch (error) {
    console.error("Error rendering the view:", error);
    appElement.innerHTML =
      "<p>Error loading content. Please try again later.</p>";
  }
}
