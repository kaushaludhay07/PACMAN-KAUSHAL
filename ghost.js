 { size, canMove } from './map.js';//mi serve per importare oggetti e funzioni da altri file 

export let ghost = {//creo l'oggetto ghost
    x: 9 * size,//posizione x
    y: 7 * size,//posizione y
    dir: 'up',//direzione
    speed: 2//velocità
};

export function resetGhost() {//serve a riportare ghost alle condizioni di partenza 
    ghost.x = 9 * size; // Riporta X alla casella di partenza
    ghost.y = 7 * size;// Riporta yalla casella di partenza
    ghost.dir = 'up'; // reimposta la direzione
}

export function drawGhost(ctx) { // Disegna il fantasma sul canvas (corpo e occhi)
    // corpoimport
    ctx.fillStyle = '#ff0000';// Colore rosso per il corpo
    ctx.beginPath();// Resetta i tracciati precedenti
    ctx.arc(ghost.x + size/2, ghost.y + size/2 - 2, size/2 - 2, Math.PI, 0, false); // Testa tonda
    ctx.lineTo(ghost.x + size - 2, ghost.y + size - 2);//Lati del corpo
    ctx.lineTo(ghost.x + 2, ghost.y + size - 2); //base del corpo 
    ctx.closePath();// Chiude la forma del corpo
    ctx.fill(); //riempire l'interno della forma geometrica appena tracciata

    //occhi
    ctx.fillStyle = '#ffffff';// Colore bianco per la sclera degli occhi
    ctx.beginPath();// Resetta i tracciati precedenti
    ctx.arc(ghost.x + 7, ghost.y + 7, 3, 0, Math.PI * 2);//occhio sinistro
    ctx.arc(ghost.x + 13, ghost.y + 7, 3, 0, Math.PI * 2);//occhio destro 
    ctx.fill();

    ctx.fillStyle = '#0000ff'; // Colore blu per le pupille
    ctx.beginPath();// Resetta i tracciati precedenti
    ctx.arc(ghost.x + 7, ghost.y + 7, 1.5, 0, Math.PI * 2);// Pupilla sinistra
    ctx.arc(ghost.x + 13, ghost.y + 7, 1.5, 0, Math.PI * 2);// Pupilla destra
    ctx.fill();
}

export function moveGhost() {// Trova dove può girare il fantasma senza farlo tornare indietro
    if (ghost.x % size === 0 && ghost.y % size === 0) {// Controlla se il fantasma è perfettamente centrato nella casella
        let gridX = ghost.x / size;//Converte la posizione X in casella
        let gridY = ghost.y / size;//Converte la posizione y in casella

        let directions = ['left', 'right', 'up', 'down'];// Direzioni possibili
        let validDirections = [];// Array per le direzioni libere

        for (let d of directions) {//controllo una alla volta le 4 direzioni possibili
            // Se la direzione esaminata torna indietro, la salta
            if ((d === 'left' && ghost.dir === 'right') ||
                (d === 'right' && ghost.dir === 'left') ||
                (d === 'up' && ghost.dir === 'down') ||
                (d === 'down' && ghost.dir === 'up')) {
                continue;// Salta questa direzione opposta e passa subito alla prossima

            }
            if (canMove(gridX, gridY, d)) {// Se la strada è libera da muri, la aggiunge alle direzioni valide
                validDirections.push(d);
            }
        }

        if (validDirections.length === 0) {// Se è in un vicolo cieco (zero strade libere)
            // Inverte di colpo la rotta attuale per poter tornare indietro
            if (ghost.dir === 'left') ghost.dir = 'right';
            else if (ghost.dir === 'right') ghost.dir = 'left';
            else if (ghost.dir === 'up') ghost.dir = 'down';
            else if (ghost.dir === 'down') ghost.dir = 'up';
        } else { // Se ci sono strade libere
            // Sceglie un indice a caso dall'elenco delle direzioni valide
            let randomIndex = Math.floor(Math.random() * validDirections.length);
            ghost.dir = validDirections[randomIndex]; // Applica la direzione scelta a sorte
        }
    }

    // Aggiorna la posizione in pixel del fantasma in base alla rotta scelta
    // frame per frame
    if (ghost.dir === 'left') ghost.x -= ghost.speed;
    if (ghost.dir === 'right') ghost.x += ghost.speed;
    if (ghost.dir === 'up') ghost.y -= ghost.speed;
    if (ghost.dir === 'down') ghost.y += ghost.speed;
}
