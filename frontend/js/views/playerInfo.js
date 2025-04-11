export function PlayerInfoView() {
  return `
    <div class="text-center">
      <h1 class="mb-4">🧑 Información del Jugador</h1>
      <p>Aquí aparecerán tus datos, puntajes y estadísticas.</p>
      <div class="card mx-auto" style="max-width: 400px;">
        <div class="card-body">
          <h5 class="card-title">Nombre: John Doe</h5>
          <p class="card-text">Email: johndoe@example.com</p>
          <p class="card-text">Puntaje más alto: 100</p>
        </div>
      </div>
    </div>
  `;
}
