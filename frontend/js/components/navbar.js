export function renderNavbar() {
  // Select the container where the navigation bar will be inserted
  const navbarContainer = document.getElementById("navbar");

  // Create the <nav> element and assign its classes
  const navbar = document.createElement("nav");
  navbar.classList.add(
    "navbar",
    "navbar-expand-lg",
    "navbar-dark",
    "bg-dark",
    "px-4"
  );

  // Create the link for the logo (Video Roulette)
  const navbarBrand = document.createElement("a");
  navbarBrand.classList.add("navbar-brand");
  navbarBrand.href = "/";
  navbarBrand.setAttribute("data-link", "");
  navbarBrand.textContent = "Video Roulette";

  // Create the container for the navigation links
  const collapseDiv = document.createElement("div");
  collapseDiv.classList.add("collapse", "navbar-collapse");

  // Create the list of links
  const navbarList = document.createElement("ul");
  navbarList.classList.add("navbar-nav", "ms-auto");

  // Create the list items (each representing a link)
  const navItems = [
    { href: "/", text: "Home" },
    { href: "/play", text: "Play" },
    { href: "/scores", text: "High Scores" },
    { href: "/player", text: "Info" },
  ];

  // Loop through the list items and create them dynamically
  navItems.forEach((item) => {
    const navItem = document.createElement("li");
    navItem.classList.add("nav-item");

    const navLink = document.createElement("a");
    navLink.classList.add("nav-link");
    navLink.href = item.href;
    navLink.setAttribute("data-link", "");
    navLink.textContent = item.text;

    navItem.appendChild(navLink);
    navbarList.appendChild(navItem);
  });

  // Add the content to the respective containers
  collapseDiv.appendChild(navbarList);
  navbar.appendChild(navbarBrand);
  navbar.appendChild(collapseDiv);

  // Finally, insert the navigation bar into the container in the DOM
  navbarContainer.appendChild(navbar);
}
