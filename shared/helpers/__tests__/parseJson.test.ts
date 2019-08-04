import { random } from "faker";
import parseJson from "../parseJson";

describe("parseJson", () => {
    it("Should return undefined when input is null", () => {
        const result = parseJson(null);

        expect(result).toBeUndefined();
    });
    it("Should return undefined when input is undefined", () => {
        const result = parseJson(undefined);

        expect(result).toBeUndefined();
    });
    it("Should return undefined when input is empty string", () => {
        const result = parseJson("");

        expect(result).toBeUndefined();
    });
    it("Should return undefined when input is an invalid json string", () => {
        const result = parseJson(random.uuid());

        expect(result).toBeUndefined();
    });
    it("Should return json parsed object when input is a valid json string", () => {
        const expectedResult = {
            id: random.uuid()
        };
        const resultStr = JSON.stringify(expectedResult);

        const actualResult = parseJson(resultStr);

        expect(actualResult).toStrictEqual(expectedResult);
    });
});
