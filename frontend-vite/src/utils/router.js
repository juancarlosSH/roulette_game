import { ErrorMessage } from "../components/ErrorMessage/index";
import { HomeView } from "../views/Home/index";
import { PlayView } from "../views/Play/index";
import { LeaderboardView } from "../views/Leaderboard/index";
import { ProfileView } from "../views/Profile/index";
import { NotFoundView } from "../views/NotFound/index";

export class Router {
  /** Routes list. */
  oRoutes = {
    "/": {
      sTitle: "Home | Roulette Game",
      oView: new HomeView(),
    },
    "/play": {
      sTitle: "Play | Roulette Game",
      oView: new PlayView(),
    },
    "/leaderboard": {
      sTitle: "Leaderboard | Roulette Game",
      oView: new LeaderboardView(),
    },
    "/profile": {
      sTitle: "Profile | Roulette Game",
      oView: new ProfileView(),
    },
  };

  /** App element. */
  elApp = null;

  /**
   * Router constructor.
   */
  constructor() {
    this.elApp = document.getElementById("app");
    this._initRouter();
  }

  /**
   * This function initializes the router.
   */
  _initRouter() {
    // Delegate handle navigation events to the _handleRouting function.
    window.addEventListener("popstate", this._handleRouting.bind(this));

    // Delegate link clicks to the _handleLinkClick function.
    document.addEventListener("click", this._handleLinkClick.bind(this));

    this._handleRouting();
  }

  /**
   * Function to load and render a view.
   * @param {} oView - The view to render.
   */
  async _renderView(oView) {
    // Clear previous content
    while (this.elApp.firstChild) {
      this.elApp.removeChild(this.elApp.firstChild);
    }

    try {
      const elViewContent = await oView._render();
      this.elApp.appendChild(elViewContent);
    } catch (oError) {
      console.error("Error rendering view:", oError);
      new ErrorMessage(oError.message);
    }
  }

  /**
   * This function creates a not found route.
   * @returns {Object} - The not found route.
   */
  _createNotFoundRoute() {
    return {
      sTitle: "404 | Not Found",
      oView: new NotFoundView(),
    };
  }

  /**
   * This function handles the routing of the application.
   * It is called when the user clicks on a link or when the page is loaded.
   */
  async _handleRouting() {
    // get the path.
    const sPath = window.location.pathname;

    // get the route or create a not found route.
    const oRoute = this.oRoutes[sPath] || this._createNotFoundRoute();

    try {
      // Change the document title.
      document.title = oRoute.sTitle;

      // Render the view.
      await this._renderView(oRoute.oView);
    } catch (oError) {
      console.error("Routing error:", oError);
      new ErrorMessage(oError.message);
    }
  }

  /**
   * This function navigates to a specified path.
   * @param {String} sPath - The path to navigate to.
   */
  _navigateTo(sPath) {
    window.history.pushState({}, "", sPath);
    this._handleRouting();
  }

  /**
   * Handles the click event for links.
   * @param {Event} event - The event object.
   * @returns {void}
   */
  _handleLinkClick(event) {
    debugger;
    // Handle only data-link elements
    const oLink = event.target.closest("[data-link]");
    if (!oLink) return;

    event.preventDefault();
    const oHref = oLink.getAttribute("href");
    this._navigateTo(oHref);
  }
}
