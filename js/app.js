// scripts.js
// La méthode querySelectorAll() de Element renvoie une NodeList 
// statique représentant une liste des éléments du document qui correspondent 
// au groupe de sélecteurs spécifiés.
const cartes = document.querySelectorAll('.case');

let hasCarteFlip = false;
let premiereCarte;
let deuxiemeCarte;
// le verrou sert a pas retourner plus de 2 carte
let verrou = false;

function retournerCarte() {
    if (verrou) return;
    if (this === premiereCarte) return;

    this.classList.add('flip');

    if (!hasCarteFlip) {
        hasCarteFlip = true;
        premiereCarte = this;
        return;
    }

    deuxiemeCarte = this;
    verrou = true;

    correspondance();
}

function correspondance() {
    if (premiereCarte.dataset.legume === deuxiemeCarte.dataset.legume) {
        annuleCarte();
        return;
    }

    reflipCarte();
}

function annuleCarte() {
    premiereCarte.removeEventListener('click', retournerCarte);
    deuxiemeCarte.removeEventListener('click', retournerCarte);
    resetPlateau();
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

(function shuffle() {

    cartes.forEach(carte => {
        let ramdomPos = Math.floor(Math.random() * 12);
        carte.style.order = ramdomPos;
    });
})();

cartes.forEach(carte => carte.addEventListener('click', retournerCarte));
