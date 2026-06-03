import { size, map, canMove } from './map.js';//mi serve per importare oggetti e funzioni da altri file 

export let pacman = {  //creo l'oggetto pacman 
    x: 1 * size, //posizione x
    y: 1 * size, //posizione y
    dir: 'right', //direzione iniziale 
    nextDir: 'right', //prossima direzione 
    speed: 2,// velocità
    mouthAngle: 0.2, //angolo apertura bocca 
    mouthClosing: false //chiusura e apertura bocca 
};

export function resetPacman() { //serve a riportare Pac-Man alle condizioni di partenza 
    pacman.x = 1 * size; // Riporta X alla casella di partenza
    pacman.y = 1 * size; // Riporta y alla casella di partenza
    pacman.dir = 'right'; // reimposta la direzione 
    pacman.nextDir = 'right';// reimposta la prossima direzione 
}

function animateMouth() { // Gestisce il ciclo continuo di apertura e chiusura della bocca
    if (pacman.mouthClosing) {
        pacman.mouthAngle -= 0.02; // Chiude leggermente la bocca
        // Se è quasi chiusa, cambia modalità e inizia ad aprirla
        if (pacman.mouthAngle <= 0.01) pacman.mouthClosing = false;
    } else {
        pacman.mouthAngle += 0.02;// Apre leggermente la bocca
        // Se è aperta al massimo, cambia modalità e inizia a chiuderla
        if (pacman.mouthAngle >= 0.25) pacman.mouthClosing = true;
    }
}

export function drawPacman(ctx) { // Disegna Pac-Man sul canvas
    ctx.save();// Salva le impostazioni grafiche
    ctx.translate(pacman.x + size/2, pacman.y + size/2);// controllo spostamento pacman in base alla direzione 
    
     // Ruota il disegno in base a dove sta camminando
    if (pacman.dir === 'left') ctx.rotate(Math.PI);
    if (pacman.dir === 'up') ctx.rotate(-Math.PI / 2);
    if (pacman.dir === 'down') ctx.rotate(Math.PI / 2);

    ctx.fillStyle = '#f7ff00'; // Imposta il colore giallo
    ctx.beginPath();// Resetta i tracciati precedenti
     // Disegna il corpo tondo lasciando lo spazio per la bocca
    ctx.arc(0, 0, size/2 - 2, pacman.mouthAngle * Math.PI, (2 - pacman.mouthAngle) * Math.PI);
    ctx.lineTo(0, 0); // Chiude lo spicchio della bocca verso
    ctx.fill(); 
    ctx.restore();// Ripristina le impostazioni grafiche
}

export function movePacman(updateScoreUI) {// Gestisce il movimento e le svolte di Pac-Man sulla griglia
    let isMoving = true;

    // Controlla se Pac-Man è perfettamente allineato a una casella, bug grafici 
    if (pacman.x % size === 0 && pacman.y % size === 0) {
        let gridX = pacman.x / size; // Converte la posizione X in coordinate 
        let gridY = pacman.y / size; // Converte la posizione y in coordinate 

        if (canMove(gridX, gridY, pacman.nextDir)) {// Se la svolta desiderata è libera, cambia direzione
            pacman.dir = pacman.nextDir;
        }

        if (!canMove(gridX, gridY, pacman.dir)) {// Se la strada davanti è bloccata da un muro, si ferma
            isMoving = false;
        }
    }

    if (isMoving) {// se è in movimento e ha l strada libera possiamo scelgiere uno di questi movimenti 
        if (pacman.dir === 'left') pacman.x -= pacman.speed;
        if (pacman.dir === 'right') pacman.x += pacman.speed;
        if (pacman.dir === 'up') pacman.y -= pacman.speed;
        if (pacman.dir === 'down') pacman.y += pacman.speed;
        animateMouth(); // Fa muovere la bocca mentre cammina
    }

    //serve per capire se Pac-Man sta mangiando una pallina."
    let centerGridX = Math.floor((pacman.x + size / 2) / size); //gestisce le collissioni e 
    let centerGridY = Math.floor((pacman.y + size / 2) / size);// fa capire la poszione 

    if (map[centerGridY][centerGridX] === 0) { // Se nella casella attuale c'è un punto (0)
        map[centerGridY][centerGridX] = null;   // Svuota la casella per far sparire il punto
        updateScoreUI(10); // Chiama la funzione passata dal main per aumentare il punteggio
    }
}

// Ascolta i tasti per cambiare direzione
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') pacman.nextDir = 'left';
    if (e.key === 'ArrowRight') pacman.nextDir = 'right';
    if (e.key === 'ArrowUp') pacman.nextDir = 'up';
    if (e.key === 'ArrowDown') pacman.nextDir = 'down';
});
