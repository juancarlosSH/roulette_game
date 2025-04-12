/**
 * Roulette Game Router - Vanilla JS (DOM manipulation version)
 */

// View imports
import { renderHomeView } from "../views/Home/index.js";
import { renderPlayView } from "../views/Play/index.js";
import { renderBestScoresView } from "../views/Leaderboard/index.js";
import { renderPlayerInfoView } from "../views/Profile/index.js";

// Route configuration
const routes = {
  "/": {
    view: renderHomeView,
    title: "Home | Roulette Game",
  },
  "/play": {
    view: renderPlayView,
    title: "Play | Roulette Game",
    requiresAuth: true,
  },
  "/scores": {
    view: renderBestScoresView,
    title: "Leaderboard | Roulette Game",
  },
  "/player": {
    view: renderPlayerInfoView,
    title: "Profile | Roulette Game",
    requiresAuth: true,
  },
};

// DOM Elements
let appElement;

// Router initialization
export function initRouter() {
  appElement = document.getElementById("app");
  if (!appElement) {
    console.error("App container not found");
    return;
  }

  // Handle navigation events
  window.addEventListener("popstate", handleRouting);

  // Delegate link clicks
  document.addEventListener("click", handleLinkClick);

  // Initial render
  handleRouting();
}

// Route handlers
async function handleRouting() {
  const path = window.location.pathname;
  const route = routes[path] || createNotFoundRoute();

  try {
    // Update document title
    document.title = route.title;

    // Check authentication if required
    if (route.requiresAuth && !isAuthenticated()) {
      navigateTo("/");
      return;
    }

    // Render the view
    await renderView(route.view);
  } catch (error) {
    console.error("Routing error:", error);
    await renderView(createErrorView("Error loading page").view);
  }
}

function handleLinkClick(event) {
  // Handle only data-link elements
  const link = event.target.closest("[data-link]");
  if (!link) return;

  event.preventDefault();
  const href = link.getAttribute("href");
  navigateTo(href);
}

// View rendering with DOM methods
async function renderView(viewFunction) {
  // Clear previous view safely
  while (appElement.firstChild) {
    appElement.removeChild(appElement.firstChild);
  }

  // Get new view content
  const viewContent = await viewFunction();

  // Append new content using DOM methods
  if (viewContent instanceof Node) {
    appElement.appendChild(viewContent);
  } else if (typeof viewContent === "string") {
    const tempDiv = document.createElement("div");
    tempDiv.textContent = viewContent; // Safe text content insertion
    appElement.appendChild(tempDiv);
  } else {
    throw new Error("Invalid view return type");
  }
}

export function navigateTo(path) {
  window.history.pushState({}, "", path);
  handleRouting();
}

// Auth check
function isAuthenticated() {
  return localStorage.getItem("authToken") !== null;
}

// Dynamic route creation for errors
function createNotFoundRoute() {
  const notFoundView = document.createElement("div");
  notFoundView.className = "container text-center py-5";

  const title = document.createElement("h1");
  title.textContent = "404 - Page Not Found";
  title.className = "text-danger mb-4";

  const message = document.createElement("p");
  message.textContent = "The requested page could not be found.";
  message.className = "lead";

  const homeLink = document.createElement("a");
  homeLink.href = "/";
  homeLink.textContent = "Go to Home";
  homeLink.className = "btn btn-primary mt-3";
  homeLink.setAttribute("data-link", "");

  notFoundView.appendChild(title);
  notFoundView.appendChild(message);
  notFoundView.appendChild(homeLink);

  return {
    view: () => Promise.resolve(notFoundView),
    title: "404 | Not Found",
  };
}

function createErrorView(errorMessage) {
  const errorView = document.createElement("div");
  errorView.className = "container text-center py-5";

  const title = document.createElement("h1");
  title.textContent = "Error";
  title.className = "text-danger mb-4";

  const message = document.createElement("p");
  message.textContent = errorMessage;
  message.className = "lead";

  const homeLink = document.createElement("a");
  homeLink.href = "/";
  homeLink.textContent = "Go to Home";
  homeLink.className = "btn btn-primary mt-3";
  homeLink.setAttribute("data-link", "");

  errorView.appendChild(title);
  errorView.appendChild(message);
  errorView.appendChild(homeLink);

  return {
    view: () => Promise.resolve(errorView),
    title: "Error | Roulette Game",
  };
}
