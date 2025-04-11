import { HomeView } from "./views/home.js";
import { PlayView } from "./views/play.js";
import { BestScoresView } from "./views/bestScores.js";
import { PlayerInfoView } from "./views/playerInfo.js";

const routes = {
  "/": HomeView,
  "/play": PlayView,
  "/scores": BestScoresView,
  "/player": PlayerInfoView,
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
  const view = routes[path] || HomeView;
  document.getElementById("app").innerHTML = view();
}
