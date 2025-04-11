import { initRouter } from "./router.js";
import { renderNavbar } from "./components/navbar.js";

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar();
  initRouter();
});
