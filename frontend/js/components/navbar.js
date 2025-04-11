export function renderNavbar() {
  // Seleccionamos el contenedor donde se va a insertar la barra de navegación
  const navbarContainer = document.getElementById("navbar");

  // Creamos el elemento <nav> y asignamos sus clases
  const navbar = document.createElement("nav");
  navbar.classList.add(
    "navbar",
    "navbar-expand-lg",
    "navbar-dark",
    "bg-dark",
    "px-4"
  );

  // Creamos el enlace para el logo (🎥 Video Roulette)
  const navbarBrand = document.createElement("a");
  navbarBrand.classList.add("navbar-brand");
  navbarBrand.href = "/";
  navbarBrand.setAttribute("data-link", "");
  navbarBrand.textContent = "🎥 Video Roulette";

  // Creamos el contenedor de los enlaces de navegación
  const collapseDiv = document.createElement("div");
  collapseDiv.classList.add("collapse", "navbar-collapse");

  // Creamos la lista de enlaces
  const navbarList = document.createElement("ul");
  navbarList.classList.add("navbar-nav", "ms-auto");

  // Creamos los elementos de la lista (cada uno representando un enlace)
  const navItems = [
    { href: "/", text: "Inicio" },
    { href: "/play", text: "Jugar" },
    { href: "/scores", text: "Mejores Puntajes" },
    { href: "/player", text: "Información" },
  ];

  // Recorremos los items de la lista y los creamos dinámicamente
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

  // Añadimos el contenido a los contenedores respectivos
  collapseDiv.appendChild(navbarList);
  navbar.appendChild(navbarBrand);
  navbar.appendChild(collapseDiv);

  // Finalmente, insertamos la barra de navegación al contenedor en el DOM
  navbarContainer.appendChild(navbar);
}
