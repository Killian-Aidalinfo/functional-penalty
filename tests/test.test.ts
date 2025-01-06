import { describe, expect, it } from "bun:test";

import { updateScore, checkWinner, randomShot, simulatePenaltyShootout } from "../src/index";
import type { Score } from "../src/index";


describe("updateScore", () => {
    it("Aaugmenter le score de l'équipe A", () => {
        const initialScore: Score = { equipeA: 0, equipeB: 0 };
        const updatedScore = updateScore(initialScore, "A");
        expect(updatedScore).toEqual({ equipeA: 1, equipeB: 0 });
    });

    it("Augmenter le score de l'équipe B", () => {
        const initialScore: Score = { equipeA: 0, equipeB: 0 };
        const updatedScore = updateScore(initialScore, "B");
        expect(updatedScore).toEqual({ equipeA: 0, equipeB: 1 });
    });

    it("Tir manqué", () => {
        const initialScore: Score = { equipeA: 0, equipeB: 0 };
        const updatedScore = updateScore(initialScore, "miss");
        expect(updatedScore).toEqual({ equipeA: 0, equipeB: 0 });
    });
});

describe("checkWinner", () => {
    it("Equipe A gagnante", () => {
        const score: Score = { equipeA: 5, equipeB: 2 };
        const result = checkWinner(score, 2);
        expect(result).toBe("Équipe A");
    });

    it("Equipe B gagnante", () => {
        const score: Score = { equipeA: 2, equipeB: 5 };
        const result = checkWinner(score, 2);
        expect(result).toBe("Équipe B");
    });

    it("Aucun vainqueur", () => {
        const score: Score = { equipeA: 3, equipeB: 3 };
        const result = checkWinner(score, 2);
        expect(result).toBeNull();
    });
});


describe("randomShot", () => {
    it("retourne une valeur valide (A, B ou miss)", () => {
        const result = randomShot();
        expect(["A", "B", "miss"]).toContain(result);
    });
});

// Tests pour `simulatePenaltyShootout`
describe("simulatePenaltyShootout", () => {
    it("Gagnant ou égalité", () => {
        const { winner, history } = simulatePenaltyShootout();
        expect(["Équipe A", "Équipe B", "Égalité"]).toContain(winner);
        expect(history.length).toBeGreaterThanOrEqual(5); // Minimum 5 tirs.
    });

    it("Historique de pénalités cohérents", () => {
        const { history } = simulatePenaltyShootout();
        history.forEach(({ score }) => {
            expect(score.equipeA).toBeGreaterThanOrEqual(0);
            expect(score.equipeB).toBeGreaterThanOrEqual(0);
        });
    });
});
