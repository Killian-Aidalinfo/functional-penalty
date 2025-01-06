// Type score d'équipe
type Score = { equipeA: number; equipeB: number };

// Type résultat du tir
type ShotResult = "A" | "B" | "miss";

// Type historique des tirs
type ShotHistory = { shotNumber: number; score: Score; result: ShotResult }[];

// Fonction pour générer un résultat de tir au hasard
const randomShot = (): ShotResult => {
    const random = Math.random(); // Génère un nombre aléatoire 
    if (random < 0.4) return "A"; // l'équipe A marque
    if (random < 0.8) return "B"; // l'équipe B marque
    return "miss"; // le tir est raté
};

// Update du scrore en fonction du résultat du tir
const updateScore = (score: Score, result: ShotResult): Score => {
    switch (result) {
        case "A":
            return { ...score, equipeA: score.equipeA + 1 }; // Augmente le score de l'équipe A
        case "B":
            return { ...score, equipeB: score.equipeB + 1 }; // Augmente le score de l'équipe B
        default:
            return score; // Aucun changement pour un tir raté
    }
};

// Fonction pour vérifier si un vainqueur peut être déterminé avant la fin des 5 tirs obligatoires
const checkWinner = (score: Score, shots: number): string | null => {
    // Si l'équipe A a gagné avant les 5 tirs
    if (score.equipeA > score.equipeB + shots) return "Équipe A";
    // Si l'équipe B a gagné avant les 5 tirs
    if (score.equipeB > score.equipeA + shots) return "Équipe B";
    // Pas de vainqueur
    return null;
};

// Fonction récursive pour simuler une séance de tirs au but
const simulatePenaltyShootout = (
    currentScore: Score = { equipeA: 0, equipeB: 0 }, // Score initial des deux équipes
    history: ShotHistory = [], // Historique des tirs au début de la simulation
    shotNumber: number = 1 // Numéro du premier tir
): { winner: string; history: ShotHistory } => {
    const result = randomShot(); // Génère un tir aléatoire
    const newScore = updateScore(currentScore, result); // Met à jour le score
    const newHistory = [
        ...history, // Ajoute l'historique existant
        { shotNumber, score: newScore, result }, // Ajoute le détail du nouveau tir
    ];

    // Calcul du nombre de tirs restants avant d'atteindre 5 tirs
    const shots = 5 - Math.ceil(shotNumber / 2);

    // Vérifie si un vainqueur est déterminé
    const winner = checkWinner(newScore, shots);

    // Si un vainqueur est trouvé ou que les 10 tirs ont été effectués
    if (winner || shotNumber >= 10) {
        return { winner: winner ?? "Égalité", history: newHistory };
    }

    // Recursion pour simuler la séance de tirs au but
    return simulatePenaltyShootout(newScore, newHistory, shotNumber + 1);
};

// Fonction pour afficher l'historique des tirs à l'utilisateur
const displayHistory = (history: ShotHistory, winner: string): void => {
    history.forEach(({ shotNumber, score, result }) => {
        // Indique si un point a été marqué par chaque équipe pour ce tir
        const changeA = result === "A" ? "+1" : "0";
        const changeB = result === "B" ? "+1" : "0";
        // Affiche le détail de chaque tir
        console.log(
            `Tir ${shotNumber} : Score : ${score.equipeA}/${score.equipeB} (Équipe A : ${changeA} | Équipe B : ${changeB})`
        );
    });
    // Affiche le vainqueur et le score final
    console.log(`Victoire : ${winner} (Score : ${history[history.length - 1].score.equipeA}/${history[history.length - 1].score.equipeB})`);
};


const { winner, history } = simulatePenaltyShootout(); // Lance la simulation des tirs
displayHistory(history, winner); // Affiche l'historique
