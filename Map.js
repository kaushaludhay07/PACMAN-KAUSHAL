export default class Map { // classe mappa

  constructor(level) { // costruttore riceve livello
    this.CELL = 20; // dimensione cella

    // 1 = muro, 0 = punto, 2 = vuoto
    this.grid = level; // salva mappa
    this.rows = level.length; // righe
    this.cols = level[0].length; // colonne
  }

  draw(ctx) { // disegna mappa
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {

        let x = c * this.CELL; // posizione X
        let y = r * this.CELL; // posizione Y

        if (this.grid[r][c] === 1) { // muro
          ctx.fillStyle = "blue"; // colore muro
          ctx.fillRect(x, y, this.CELL, this.CELL); // disegna muro
        }

        if (this.grid[r][c] === 0) { // punto
          ctx.fillStyle = "yellow"; // colore punto
          ctx.beginPath(); // inizio cerchio
          ctx.arc(x+10, y+10, 3, 0, Math.PI*2); // punto piccolo
          ctx.fill(); // riempi
        }
      }
    }
  }

  eat(r, c) { // mangia punto
    if (this.grid[r][c] === 0) { // se c’è punto
      this.grid[r][c] = 2; // lo rimuove
      return 10; // ritorna punti
    }
    return 0; // niente punti
  }
}