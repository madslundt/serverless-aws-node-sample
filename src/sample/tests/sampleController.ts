import { HttpStatusCode } from "@shared/httpStatusCodes";
import * as handlers from "@src/sample/handlers";
import { callSuccess } from "@test/callHelpers";
import { random } from "faker";
import { getSample } from "../sampleController";

describe("sampleController", () => {
    describe("getSample", () => {
        const getSampleHandlerMock: jest.SpyInstance<handlers.IGetSampleResponse> = jest.spyOn(
            handlers,
            "getSampleHandler"
        );

        beforeEach(() => {
            getSampleHandlerMock.mockClear();
        });

        it("Should return http status code OK", async () => {
            const expectedStatusCode = HttpStatusCode.Ok;
            getSampleHandlerMock.mockReturnValueOnce({
                a: random.number(),
                b: random.number(),
                sum: random.number()
            });

            const response = await callSuccess<handlers.IGetSampleResponse>(getSample);

            const actualStatusCode = response.statusCode;
            expect(actualStatusCode).toBe(expectedStatusCode);
        });

        it("Should return a", async () => {
            const expectedA = random.number();
            getSampleHandlerMock.mockReturnValueOnce({
                a: expectedA,
                b: random.number(),
                sum: random.number()
            });

            const response = await callSuccess<handlers.IGetSampleResponse>(getSample);

            const actualA = response.parsedBody.a;
            expect(actualA).toBe(expectedA);
        });

        it("Should return b", async () => {
            const expectedB = random.number();
            getSampleHandlerMock.mockReturnValueOnce({
                a: random.number(),
                b: expectedB,
                sum: random.number()
            });

            const response = await callSuccess<handlers.IGetSampleResponse>(getSample);

            const actualB = response.parsedBody.b;
            expect(actualB).toBe(expectedB);
        });

        it("Should return sum", async () => {
            const expectedSum = random.number();
            getSampleHandlerMock.mockReturnValueOnce({
                a: random.number(),
                b: random.number(),
                sum: expectedSum
            });

            const response = await callSuccess<handlers.IGetSampleResponse>(getSample);

            const actualSum = response.parsedBody.sum;
            expect(actualSum).toBe(expectedSum);
        });
    });
});
