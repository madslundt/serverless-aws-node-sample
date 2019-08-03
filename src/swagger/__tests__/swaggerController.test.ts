import { HttpStatusCode } from "@infrastructure/httpStatusCodes";
import * as handlers from "@src/swagger/handlers";
import { callSuccess } from "@test/callHelpers";
import { random } from "faker";
import { getSwaggerJson } from "../swaggerController";

describe("Swagger Controller", () => {
    describe("Get Swagger Json", () => {
        const getSwaggerJsonHandlerMock: jest.SpyInstance<
            Promise<handlers.IGetSwaggerJsonResponse>
        > = jest.spyOn(handlers, "getSwaggerJsonHandler").mockImplementation(jest.fn());

        beforeEach(() => {
            getSwaggerJsonHandlerMock.mockClear();
        });

        it("Should return http status code Ok", async () => {
            const expectedStatusCode = HttpStatusCode.Ok;
            getSwaggerJsonHandlerMock.mockResolvedValueOnce({} as handlers.IGetSwaggerJsonResponse);

            const response = await callSuccess<handlers.IGetSwaggerJsonResponse>(getSwaggerJson);

            const actualStatusCode = response.statusCode;
            expect(actualStatusCode).toBe(expectedStatusCode);
        });
        it("Should return result.info.title", async () => {
            const expectedTitle = random.uuid();
            const result: handlers.IGetSwaggerJsonResponse = {
                info: {
                    title: expectedTitle,
                    version: random.uuid()
                },
                paths: {}
            };

            getSwaggerJsonHandlerMock.mockResolvedValue(result);

            const response = await callSuccess<handlers.IGetSwaggerJsonResponse>(getSwaggerJson);

            const actualTitle = response.parsedBody.info.title;
            expect(actualTitle).toBe(expectedTitle);
        });
        it("Should return result.info.version", async () => {
            const expecctedVersion = random.uuid();
            const result: handlers.IGetSwaggerJsonResponse = {
                info: {
                    title: random.uuid(),
                    version: expecctedVersion
                },
                paths: {}
            };

            getSwaggerJsonHandlerMock.mockResolvedValueOnce(result);

            const response = await callSuccess<handlers.IGetSwaggerJsonResponse>(getSwaggerJson);

            const actualVersion = response.parsedBody.info.version;
            expect(actualVersion).toBe(expecctedVersion);
        });
    });
});
