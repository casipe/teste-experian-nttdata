import { describe, expect } from "@jest/globals";
import { datasMock } from "../../../utils/mocks";
import { validateForm } from "./";
const item = datasMock[0];

describe("Validação dos dados", () => {
    it("Falha ao validar os dados", () => {
        expect(validateForm(item, true)).toBe(true);
    });
});
