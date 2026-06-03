//gestisce il gameloop, i punti e la logica

//mi serve per importare oggetti e funzioni da altri file 
import { size, map, drawMap } from './map.js';
import { pacman, drawPacman, movePacman, resetPacman } from './pacman.js';
import { ghost, drawGhost, moveGhost, resetGhost } from './ghost.js';

const canvas = document.getElementById('gameCanvas');// Prende l'area di gioco dall'HTML tramite ID
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score'); // Prende l'elemento dall'HTML per mostrare il punteggio

canvas.width = map[0].length * size; // imposta la larghezza, ricordare pixel
canvas.height = map.length * size; // imposta la lunghezza, ricordare pixel 

let score = 0;

//funzione per aggiornare il punteggio 
function addScore(points) {
    score += points; //riceve punti, somma alla variabile  e aggiorna html
    scoreElement.innerText = score;
}

//controlla se Pac-Man e il fantasmino si toccano
function checkCollision() {
    let distanceX = Math.abs(pacman.x - ghost.x);//calcola la distanza sull'asse x
    let distanceY = Math.abs(pacman.y - ghost.y);//calcola la distanza sull'asse y

    if (distanceX < size - 4 && distanceY < size - 4) {// se la distanza è minore e si toccano, -4 serve per rendere piu preciso il tocco 
        alert("GAME OVER! Ti ha preso il fantasmino. Il tuo punteggio: " + score);
        resetGame();
    }
}

function resetGame() {
    score = 0;
    scoreElement.innerText = score;//aggiorna la scritta e la porta a 0
    
    resetPacman();  // Ripristina la posizione e la direzione
    resetGhost();  // Ripristina la posizione e la direzione

    for (let row = 0; row < map.length; row++) {  // Avvia un ciclo FOR per scorrere tutte le righe 
        for (let col = 0; col < map[row].length; col++) {  // Avvia un ciclo FOR per scorrere tutte le colonne
            if (map[row][col] === null) { // Se la cella esaminata è nulla
                map[row][col] = 0;//fa ricomparire il pallino di cibo
            }
        }
    }
}

function gameLoop() { // Definisce il ciclo continuo del gioco
    ctx.clearRect(0, 0, canvas.width, canvas.height); // ripulisce lo schermo
    
    drawMap(ctx); // Disegna la mappa con i muri e i pallini di cibo passando il contesto grafico
    movePacman(addScore); // Calcola il movimento di pacman
    moveGhost();     // Calcola il movimento del fantasmino
    checkCollision();  // Verifica se in questo frame è avvenuta una collisione
    drawPacman(ctx);  // Disegna graficamente Pac-Man 
    drawGhost(ctx);  // Disegna graficamente il fantasmino 
    
    requestAnimationFrame(gameLoop); // Avvia per la primissima volta il ciclo di gioco continuo
}

// Avvia il ciclo di gioco
requestAnimationFrame(gameLoop);

