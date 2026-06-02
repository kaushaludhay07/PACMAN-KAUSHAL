export default class Player {

  constructor(map) { // riceve mappa
    this.map = map; // salva mappa

    this.r = 1; // riga iniziale
    this.c = 1; // colonna iniziale

    this.dir = { r: 0, c: 0 }; // direzione
  }

  update() { // aggiorna posizione

    let nr = this.r + this.dir.r; // nuova riga
    let nc = this.c + this.dir.c; // nuova colonna

    if (this.map.grid[nr][nc] !== 1) { // se non muro
      this.r = nr; // muovi
      this.c = nc;
    }
  }

  draw(ctx, cell) { // disegna player

    let x = this.c * cell + cell/2; // centro X
    let y = this.r * cell + cell/2; // centro Y

    ctx.fillStyle = "yellow"; // colore

    ctx.beginPath(); // inizio cerchio
    ctx.arc(x, y, cell/2 - 2, 0, Math.PI*2); // corpo Pac-Man
    ctx.fill(); // riempi
  }
}