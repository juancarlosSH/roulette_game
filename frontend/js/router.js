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
  window.onpopstate = renderRoute;
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      history.pushState(null, "", e.target.href);
      renderRoute();
    }
  });
  renderRoute();
}

function renderRoute() {
  const path = window.location.pathname;
  const view = routes[path] || renderHomeView;
  const appElement = document.getElementById("app");
  const viewElement = view(); // Ahora view devuelve un elemento DOM, no una cadena

  // Limpiar el contenido anterior antes de insertar el nuevo
  appElement.innerHTML = "";
  appElement.appendChild(viewElement); // Agregar el nuevo contenido como un elemento DOM
}
