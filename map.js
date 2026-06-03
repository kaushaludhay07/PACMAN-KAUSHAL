export const size = 20; //condividere la costante size con gli altri file

export const map = [ //1 muri e 0 palini
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,0,1],
    [1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1],
    [1,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,1],
    [1,1,1,1,0,1,0,0,0,0,0,0,0,1,0,1,1,1,1],
    [1,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,1],
    [1,1,1,1,0,1,0,1,0,0,0,1,0,1,0,1,1,1,1],
    [1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

export function drawMap(ctx) { //serve a disegnare la mappa del gioco sullo schermo
    for (let row = 0; row < map.length; row++) { //scorro tutte le righe 
        for (let col = 0; col < map[row].length; col++) { // scorro tutte le colonne
            if (map[row][col] === 1) { // Se c'è un 1, disegna un muro quadrato
                ctx.fillStyle = '#1a1a40'; 
                ctx.fillRect(col * size, row * size, size, size); // dimnesione del muro 
            } else if (map[row][col] === 0) {// Se c'è uno 0, disegna un cerchietto 
                ctx.fillStyle = '#ffb8ae'; 
                ctx.beginPath(); // Resetta i tracciati precedenti
                ctx.arc(col * size + size/2, row * size + size/2, 2, 0, Math.PI * 2); //dimensione del cibo 
                ctx.fill();
            }
        }
    }
}

export function canMove(gridX, gridY, direction) { //controllare se il personaggio può muoversi o se troverà un ostacolo
    let nextX = gridX;// Copia la posizione X attuale
    let nextY = gridY;// Copia la posizione y attuale

    if (direction === 'left') nextX--;
    if (direction === 'right') nextX++;   
    if (direction === 'up') nextY--;//modifica le coordinate in base al movimento scelto
    if (direction === 'down') nextY++;


    // Se la nuova posizione esce dai bordi della mappa, nega il movimento
    if (nextY < 0 || nextY >= map.length || nextX < 0 || nextX >= map[0].length) {
        return false;
    }
    // se invece è diverso da 1(un muro) allora ti fa muovere 
    return map[nextY][nextX] !== 1;
}
