export default class Ghost {

  constructor(map, r, c, color) { // posizione iniziale
    this.map = map; // mappa
    this.r = r; // riga
    this.c = c; // colonna
    this.color = color; // colore
  }

  update() { // movimento semplice

    let dirs = [ // possibili direzioni
      {r:1,c:0},
      {r:-1,c:0},
      {r:0,c:1},
      {r:0,c:-1}
    ];

    let d = dirs[Math.floor(Math.random()*4)]; // scelta random

    let nr = this.r + d.r; // nuova riga
    let nc = this.c + d.c; // nuova colonna

    if (this.map.grid[nr][nc] !== 1) { // se non muro
      this.r = nr; // muovi
      this.c = nc;
    }
  }

  draw(ctx, cell) { // disegna fantasma

    let x = this.c * cell; // X
    let y = this.r * cell; // Y

    ctx.fillStyle = this.color; // colore fantasma

    ctx.fillRect(x, y, cell, cell); // corpo semplice
  }
}