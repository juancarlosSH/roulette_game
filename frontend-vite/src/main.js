import { Navbar } from "./components/Navbar/index.js";
import { ErrorMessage } from "./components/ErrorMessage/index.js";
import { Router } from "./utils/router.js";

/**
 * Main function to initialize the application
 */
function main() {
  try {
    // Check if the navbar container exists
    const navbarContainer = document.getElementById("navbar");
    if (!navbarContainer) {
      throw new Error("Navbar container not found");
    }

    // Initialize the Navbar component
    new Navbar();

    // Check if the app container exists
    let elAppContainer = document.getElementById("app");
    if (!elAppContainer) {
      throw new Error("App container not found");
    }

    new Router();
  } catch (oError) {
    console.error("App initialization failed:", oError);
    new ErrorMessage(oError.message);
  }
}

main();
