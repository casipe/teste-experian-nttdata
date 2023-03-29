import { describe, expect, test } from "@jest/globals";
import {
    calculateTotalFazenda,
    calculateAreaTotal,
    calculateTotalByState,
    calculateTotalByCulture,
    calculateTotalBySolo,
} from "../Dashboard";
import { datasMock } from "../../utils/mocks";

describe("Total de Fazenda", () => {
    test("O valor deve ser 788", () => {
        expect(calculateAreaTotal(datasMock)).toBe(900);
    });
});

describe("Total de Área", () => {
    test("O valor deve ser 2", () => {
        expect(calculateTotalFazenda(datasMock)).toBe(2);
    });
});

describe("Total de Área por Estado", () => {
    test("Retorna um array", () => {
        expect(Array.isArray(calculateTotalByState(datasMock))).toBe(true);
    });
});

describe("Total de Área por Cultura", () => {
    test("Retona um array", () => {
        expect(Array.isArray(calculateTotalByCulture(datasMock))).toBe(true);
    });
});

describe("Total de Área por Solo", () => {
    test("Retona um array", () => {
        expect(Array.isArray(calculateTotalBySolo(datasMock))).toBe(true);
    });
    test("Retorna um array com 3 elementos", () => {
        const testObject: any[] = [
            ["Uso do Solo", "Área Total"],
            ["Agricultável", 175.9],
            ["Vegetação", 66.6],
        ];
        expect(calculateTotalBySolo(datasMock)).toMatchObject(testObject);
    });
});
