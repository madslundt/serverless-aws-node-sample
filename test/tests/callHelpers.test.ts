import { ApiCallback, ApiContext, ApiEvent, ApiHandler } from "@shared/api.interfaces";
import { callFailure, callSuccess } from "@test/callHelpers";
import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { random } from "faker";

describe("callHelpers", () => {
    describe("callSuccess", () => {
        const handlerMock: jest.Mock<ApiHandler> = jest.fn().mockImplementation(
            (event: APIGatewayEvent, context: Context, callback: ApiCallback): any => {
                callback(undefined, {
                    body: JSON.stringify({ id: random.uuid() })
                } as APIGatewayProxyResult);
            }
        );

        afterEach(() => {
            handlerMock.mockClear();
        });

        it("Should call handler", async () => {
            await callSuccess(handlerMock);

            expect(handlerMock).toHaveBeenCalledTimes(1);
        });
        it("Should call handler with event", async () => {
            const expectedEvent = {
                body: random.uuid()
            } as ApiEvent;

            await callSuccess(handlerMock, expectedEvent);

            const actualEvent = handlerMock.mock.calls[0][0];
            expect(actualEvent).toStrictEqual(expectedEvent);
        });
        it("Should call handler with context", async () => {
            const expectedContext = {
                functionName: random.uuid()
            } as ApiContext;

            await callSuccess(handlerMock, undefined, expectedContext);

            const actualContext = handlerMock.mock.calls[0][1];
            expect(actualContext).toStrictEqual(expectedContext);
        });

        it("Should reject if callback result is undefined", async () => {
            handlerMock.mockImplementation(
                (event: APIGatewayEvent, context: Context, callback: ApiCallback): any => {
                    callback(undefined, undefined);
                }
            );

            try {
                await callSuccess(handlerMock);
            } catch (exception) {
                expect(exception).toBe("No result was returned by the handler!");
            }
        });
    });

    describe("callFailure", () => {
        const handlerMock: jest.Mock<ApiHandler> = jest.fn().mockImplementation(
            (event: APIGatewayEvent, context: Context, callback: ApiCallback): any => {
                callback(undefined, {
                    body: JSON.stringify({ id: random.uuid() })
                } as APIGatewayProxyResult);
            }
        );

        afterEach(() => {
            handlerMock.mockClear();
        });

        it("Should call handler", async () => {
            await callFailure(handlerMock);

            expect(handlerMock).toHaveBeenCalledTimes(1);
        });
        it("Should call handler with event", async () => {
            const expectedEvent = {
                body: random.uuid()
            } as ApiEvent;

            await callFailure(handlerMock, expectedEvent);

            const actualEvent = handlerMock.mock.calls[0][0];
            expect(actualEvent).toStrictEqual(expectedEvent);
        });
        it("Should call handler with context", async () => {
            const expectedContext = {
                functionName: random.uuid()
            } as ApiContext;

            await callFailure(handlerMock, undefined, expectedContext);

            const actualContext = handlerMock.mock.calls[0][1];
            expect(actualContext).toStrictEqual(expectedContext);
        });
        it("Should reject if callback result is undefined", async () => {
            handlerMock.mockImplementation(
                (event: APIGatewayEvent, context: Context, callback: ApiCallback): any => {
                    callback(undefined, undefined);
                }
            );

            try {
                await callFailure(handlerMock);
            } catch (exception) {
                expect(exception).toBe("No result was returned by the handler!");
            }
        });
    });
});
