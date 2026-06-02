import Map from "./Map.js";
import Player from "./Player.js";
import Ghost from "./Ghost.js";

export default class Game {

  constructor(canvas) { // inizializza gioco

    this.ctx = canvas.getContext("2d"); // contesto canvas

    this.level = [ // mappa semplice
      [1,1,1,1,1,1,1],
      [1,0,0,0,0,0,1],
      [1,0,1,0,1,0,1],
      [1,0,0,0,0,0,1],
      [1,1,1,1,1,1,1]
    ];

    this.map = new Map(this.level); // crea mappa
    this.player = new Player(this.map); // crea player

    this.ghosts = [ // crea fantasmi
      new Ghost(this.map, 2,2,"red"),
      new Ghost(this.map, 2,4,"cyan")
    ];

    this.cell = 20; // grandezza cella

    this.score = 0; // punteggio

    this.loop(); // avvia loop
  }

  loop() { // loop gioco

    this.update(); // aggiorna
    this.draw(); // disegna

    requestAnimationFrame(() => this.loop()); // loop continuo
  }

  update() { // logica

    this.player.update(); // aggiorna player

    for (let g of this.ghosts) { // aggiorna fantasmi
      g.update();
    }

    this.score += this.map.eat(this.player.r, this.player.c); // mangia punti
  }

  draw() { // disegno

    this.ctx.clearRect(0,0,500,500); // pulisci schermo

    this.map.draw(this.ctx); // disegna mappa

    this.player.draw(this.ctx, this.cell); // disegna player

    for (let g of this.ghosts) { // disegna fantasmi
      g.draw(this.ctx, this.cell);
    }
  }
}