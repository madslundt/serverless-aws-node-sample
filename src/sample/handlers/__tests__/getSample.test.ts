import { getSampleHandler, IGetSampleRequest } from "@src/sample/handlers";
import { random } from "faker";

describe("GetHealthCheck handler", () => {
    it("Should return a", async () => {
        const expectedA = random.number();
        const request: IGetSampleRequest = {
            a: expectedA,
            b: random.number()
        };
        const result = getSampleHandler(request);

        const actualA = result.a;
        expect(actualA).toBe(expectedA);
    });
    it("Should return B", async () => {
        const expectedB = random.number();
        const request: IGetSampleRequest = {
            a: random.number(),
            b: expectedB,
        };
        const result = getSampleHandler(request);

        const actualB = result.b;
        expect(actualB).toBe(expectedB);
    });
    it("Should return B", async () => {
        const a = random.number();
        const b = random.number();
        const expectedSum = a + b;
        const request: IGetSampleRequest = {
            a,
            b,
        };
        const result = getSampleHandler(request);

        const actualSum = result.sum;
        expect(actualSum).toBe(expectedSum);
    });
});
