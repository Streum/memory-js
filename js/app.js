// scripts.js
// La méthode querySelectorAll() de Element renvoie une NodeList 
// statique représentant une liste des éléments du document qui correspondent 
// au groupe de sélecteurs spécifiés.
const cartes = document.querySelectorAll('.case');

const titreNombreDeCoups = document.getElementById('coups');

let hasCarteFlip = false;
let premiereCarte;
let deuxiemeCarte;
// le verrou sert a pas retourner plus de 2 carte
let verrou = false;
let nombreDeCoup = 0;

// le nombre de carte divisé par 2 pour le nombre de pair
let nombreDePairRestantes = cartes.length / 2;

// début de notre jeu
startGame();

function startGame() {
    // on ajoute un event de click :) 
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
    // on remet le nombre de pair par défaut
    nombreDePairRestantes = cartes.length / 2;

    afficheRestart();

    cartes.forEach(carte => carte.classList.remove('flip'));

    resetPlateau();
    
    nombreDeCoup = 0;

    // attendre 1.5 seconde pour l'animation avant de relancer la partie
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
    // ici je retourne une carte
    // this = une carte du plateau (une div)
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

// Fonction pour relancer une partie de memory
function relancerPartieMemory() {
    console.log("La touche espace a été pressée. La partie de memory est relancée !");
    // Mettre ici le code pour relancer la partie de memory

    startGame();
}

// Écouter l'événement de pression de la touche espace
document.addEventListener("keydown", function(event) {
    console.log("Touche pressée : ", event.key);
    if (event.key === " ") {
        restartGame();
    }
});