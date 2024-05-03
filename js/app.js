const cartes = document.querySelectorAll('.case');

const titreNombreDeCoups = document.getElementById('coups');

let hasCarteFlip = false;
let premiereCarte;
let deuxiemeCarte;
let verrou = false;
let nombreDeCoup = 0;
let nombreDePairRestantes = cartes.length / 2;

startGame();

function startGame() {
    cartes.forEach(carte => carte.addEventListener('click', retournerCarte));
    shuffleCards();
    afficheScore();
}

function afficheScore() {
    titreNombreDeCoups.innerHTML = `Nombre de coups : ${nombreDeCoup}`
}

function afficheRestart() {
    titreNombreDeCoups.innerHTML = `GAME EN COURS DE RESET...`
}

function restartGame() {
    nombreDePairRestantes = cartes.length / 2;
    afficheRestart();
    cartes.forEach(carte => carte.classList.remove('flip'));
    resetPlateau();    
    nombreDeCoup = 0;

    setTimeout(() => {
        startGame();
    }, 1500);    
}

function shuffleCards() {
    cartes.forEach(carte => {
        let ramdomPos = Math.floor(Math.random() * 12);
        carte.style.order = ramdomPos;
    });
}

function retournerCarte() {    
    if (verrou) return;
    if (this === premiereCarte) return;

    this.classList.add('flip');

    if (!hasCarteFlip) {
        hasCarteFlip = true;
        premiereCarte = this;
        nombreDeCoup ++;
        afficheScore();
        return;
    }

    deuxiemeCarte = this;
    verrou = true;
    verifieLesCorrespondances();
}

function verifieLesCorrespondances() {
    if (premiereCarte.dataset.legume === deuxiemeCarte.dataset.legume) {
        desactiveLesCartes();
        return;
    }

    reflipCarte();
}

function desactiveLesCartes() {
    premiereCarte.removeEventListener('click', retournerCarte);
    deuxiemeCarte.removeEventListener('click', retournerCarte);
    nombreDePairRestantes--;

    if (nombreDePairRestantes !== 0) {
        resetPlateau();
        return;
    }

    titreNombreDeCoups.innerHTML = `Bien joué beau gosse ! Tu as fini en seulement ${nombreDeCoup} coups !`;
}

function reflipCarte() {
    setTimeout(() => {
        premiereCarte.classList.remove('flip');
        deuxiemeCarte.classList.remove('flip');
        resetPlateau();
    }, 1500);
}

function resetPlateau() {
    [hasCarteFlip, verrou] = [false, false];
    [premiereCarte, deuxiemeCarte] = [null, null];
}

function relancerPartieMemory() {
    startGame();
}

document.addEventListener("keydown", function(event) {
    console.log("Touche pressée : ", event.key);

    if (event.key === " ") {
        restartGame();
    }
});