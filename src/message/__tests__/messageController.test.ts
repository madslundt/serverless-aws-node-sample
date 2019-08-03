import { ApiEvent } from "@infrastructure/api.interfaces";
import { HttpStatusCode } from "@infrastructure/httpStatusCodes";
import * as handlers from "@src/message/handlers";
import { callSuccess } from "@test/callHelpers";
import { random } from "faker";
import { createMessage } from "../messageController";

describe("messageController", () => {
    describe("createMessage", () => {
        const createMessageHandlerMock: jest.SpyInstance = jest
            .spyOn(handlers, "createMessageHandler")
            .mockImplementation(
                jest.fn(
                    () =>
                        new Promise(resolve => {
                            resolve();
                        })
                )
            );

        beforeEach(() => {
            createMessageHandlerMock.mockClear();
        });

        it("Should call createMessageHandler once", async () => {
            await callSuccess<handlers.ICreateMessageHandlerResponse>(createMessage);

            expect(createMessageHandlerMock).toHaveBeenCalledTimes(1);
        });
        it("Should call createMessageHandler with event.body.message", async () => {
            const expectedMessage = random.uuid();
            const event = {
                body: JSON.stringify({
                    message: expectedMessage
                }),
                pathParameters: {
                    userId: random.uuid()
                }
            } as unknown as ApiEvent;

            await callSuccess<handlers.ICreateMessageHandlerResponse>(createMessage, event);

            const request: handlers.ICreateMessageHandlerRequest =
                createMessageHandlerMock.mock.calls[0][0];
            const actualMessage = request.message;
            expect(actualMessage).toBe(expectedMessage);
        });
        it("Should call createMessageHandler with event.body.userId", async () => {
            const expectedUserId = random.uuid();
            const event = {
                body: JSON.stringify({
                    message: random.uuid()
                }),
                pathParameters: {
                    userId: expectedUserId
                }
            } as unknown as ApiEvent;

            await callSuccess<handlers.ICreateMessageHandlerResponse>(createMessage, event);

            const request: handlers.ICreateMessageHandlerRequest =
                createMessageHandlerMock.mock.calls[0][0];
            const actualUserId = request.userId;
            expect(actualUserId).toBe(expectedUserId);
        });
        it("Should respond with OK", async () => {
            const result = await callSuccess<handlers.ICreateMessageHandlerResponse>(createMessage);

            const actualStatusCode = result.statusCode;
            expect(actualStatusCode).toBe(HttpStatusCode.Ok);
        });
        it("Should respond with result from createMessageHandler", async () => {
            const expectedResult = {
                id: random.uuid()
            };
            createMessageHandlerMock.mockImplementation(
                jest.fn(
                    () =>
                        new Promise(resolve => {
                            resolve(expectedResult);
                        })
                )
            );

            const result = await callSuccess<handlers.ICreateMessageHandlerResponse>(createMessage);

            const actualResult = result.parsedBody;
            expect(actualResult).toStrictEqual(expectedResult);
        });
    });
});
