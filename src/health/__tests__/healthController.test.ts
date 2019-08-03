import { ApiEvent } from "@infrastructure/api.interfaces";
import { HttpStatusCode } from "@infrastructure/httpStatusCodes";
import * as handlers from "@src/health/handlers";
import { callSuccess } from "@test/callHelpers";
import { random } from "faker";
import { getHealthCheck, getHealthCheckDetailed } from "../healthController";

describe("Health Controller", () => {
    describe("Get Health Check", () => {
        const getHealthCheckHandlerMock: jest.SpyInstance<
            handlers.IGetHealthCheckResponse
        > = jest.spyOn(handlers, "getHealthCheckHandler");

        beforeEach(() => {
            getHealthCheckHandlerMock.mockClear();
        });

        it("Should return http status code OK", async () => {
            const expectedStatusCode = HttpStatusCode.Ok;
            getHealthCheckHandlerMock.mockReturnValueOnce({
                success: random.boolean()
            });

            const response = await callSuccess<handlers.IGetHealthCheckResponse>(getHealthCheck);

            const actualStatusCode = response.statusCode;
            expect(actualStatusCode).toBe(expectedStatusCode);
        });

        it("Should return success = true", async () => {
            const expectedSuccess = random.boolean();
            getHealthCheckHandlerMock.mockReturnValueOnce({
                success: expectedSuccess
            });

            const response = await callSuccess<handlers.IGetHealthCheckResponse>(getHealthCheck);

            const actualSuccess = response.parsedBody.success;
            expect(actualSuccess).toBe(expectedSuccess);
        });
    });

    describe("Get Health Check Detailed", () => {
        const getHealthCheckDetailedHandlerMock: jest.SpyInstance<
            handlers.IGetHealthCheckDetailedResponse
        > = jest.spyOn(handlers, "getHealthCheckDetailedHandler");

        beforeEach(() => {
            getHealthCheckDetailedHandlerMock.mockClear();
        });
        it("Should return http status code OK", async () => {
            const expectedStatusCode = HttpStatusCode.Ok;
            getHealthCheckDetailedHandlerMock.mockReturnValueOnce({
                requestId: random.uuid(),
                success: random.boolean()
            });
            const event = {
                requestContext: {
                    requestId: random.uuid()
                }
            } as ApiEvent;

            const response = await callSuccess<handlers.IGetHealthCheckDetailedResponse>(
                getHealthCheckDetailed,
                event
            );

            const actualStatusCode = response.statusCode;
            expect(actualStatusCode).toBe(expectedStatusCode);
        });

        it("Should return success = true", async () => {
            const expectedSuccess = random.boolean();
            getHealthCheckDetailedHandlerMock.mockReturnValueOnce({
                requestId: random.uuid(),
                success: expectedSuccess
            });
            const event = {
                requestContext: {
                    requestId: random.uuid()
                }
            } as ApiEvent;

            const response = await callSuccess<handlers.IGetHealthCheckDetailedResponse>(
                getHealthCheckDetailed,
                event
            );

            const actualSuccess = response.parsedBody.success;
            expect(actualSuccess).toBe(expectedSuccess);
        });

        it("Should return requestId", async () => {
            const expectedRequestId = random.uuid();
            getHealthCheckDetailedHandlerMock.mockImplementation((request: handlers.IGetHealthCheckDetailedRequest) => ({
                requestId: request.requestId,
                success: random.boolean()
            }));
            const event = {
                requestContext: {
                    requestId: expectedRequestId
                }
            } as ApiEvent;

            const response = await callSuccess<handlers.IGetHealthCheckDetailedResponse>(
                getHealthCheckDetailed,
                event
            );

            const actualRequestId = response.parsedBody.requestId;
            expect(actualRequestId).toBe(expectedRequestId);
        });
    });
});
