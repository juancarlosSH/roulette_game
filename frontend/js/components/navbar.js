export function renderNavbar() {
  const navbar = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <a class="navbar-brand" href="/" data-link>🎥 Video Roulette</a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link" href="/" data-link>Inicio</a></li>
          <li class="nav-item"><a class="nav-link" href="/play" data-link>Jugar</a></li>
          <li class="nav-item"><a class="nav-link" href="/scores" data-link>Mejores Puntajes</a></li>
          <li class="nav-item"><a class="nav-link" href="/player" data-link>Información</a></li>
        </ul>
      </div>
    </nav>
  `;
  document.getElementById("navbar").innerHTML = navbar;
}
