// import javascriptlogo from "";

/**
 * Navbar component.
 */
export class Navbar {
  /** Pages list. */
  aNavbarItems = [
    { href: "/", text: "Home" },
    { href: "/play", text: "Play" },
    { href: "/leaderboard", text: "Leaderboard" },
    { href: "/profile", text: "Profile" },
  ];

  /**
   * Navbar constructor.
   */
  constructor() {
    this._render();
  }

  /**
   * Render the Navbar component.
   */
  _render() {
    // Get the navbarcontainer.
    const elNavbarContainer = document.getElementById("navbar");

    // Create the <nav> element
    const elNavbar = document.createElement("nav");
    elNavbar.classList.add(
      "navbar",
      "navbar-expand-lg",
      "navbar-dark",
      "bg-dark",
      "px-4"
    );

    // Create the navbar image.
    // const elNavbarBrandImg = document.createElement("img");
    // elNavbarBrandImg.src = javascriptlogo;
    // elNavbarBrandImg.alt = "Javascript logo";
    // elNavbarBrandImg.width = 24;
    // elNavbarBrandImg.height = 30;

    // Create the navbar logo.
    const elNavbarBrand = document.createElement("a");
    elNavbarBrand.classList.add("navbar-brand");
    elNavbarBrand.href = "/";
    elNavbarBrand.setAttribute("data-link", "");
    elNavbarBrand.textContent = "Roulette game";
    // elNavbarBrand.appendChild(elNavbarBrandImg);

    // Create the navigation container.
    const elCollapseDiv = document.createElement("div");
    elCollapseDiv.classList.add("collapse", "navbar-collapse");

    // Create the list links.
    const elNavbarList = document.createElement("ul");
    elNavbarList.classList.add("navbar-nav", "ms-auto");

    // Create and add the links to the list.
    this.aNavbarItems.forEach((oNavbarItem) => {
      // Create the list item for each link
      const elNavbarItemContainer = document.createElement("li");
      elNavbarItemContainer.classList.add("nav-item");

      // Create the link element
      const elNavbarItem = document.createElement("a");
      elNavbarItem.classList.add("nav-link");
      elNavbarItem.href = oNavbarItem.href;
      elNavbarItem.setAttribute("data-link", "");
      elNavbarItem.textContent = oNavbarItem.text;

      // Add the link to the list item
      elNavbarItemContainer.appendChild(elNavbarItem);
      elNavbarList.appendChild(elNavbarItemContainer);
    });

    // Add the content to the respective containers
    elCollapseDiv.appendChild(elNavbarList);
    elNavbar.appendChild(elNavbarBrand);
    elNavbar.appendChild(elCollapseDiv);

    // Finally, insert the navigation bar into the container in the DOM
    elNavbarContainer.appendChild(elNavbar);
  }
}
