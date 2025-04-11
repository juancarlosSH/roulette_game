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

async function renderRoute() {
  const path = window.location.pathname;
  const view = routes[path] || renderHomeView;
  const appElement = document.getElementById("app");

  // Clear the previous content before inserting the new one
  appElement.innerHTML = "";

  try {
    const viewElement = await view(); // Ensure the view resolves if it's an async function
    appElement.appendChild(viewElement); // Append the new content as a DOM element
  } catch (error) {
    console.error("Error rendering the view:", error);
    appElement.innerHTML =
      "<p>Error loading content. Please try again later.</p>";
  }
}
