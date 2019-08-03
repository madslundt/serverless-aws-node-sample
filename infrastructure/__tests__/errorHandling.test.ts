import { ApiCallback } from "@infrastructure/api.interfaces";
import errorHandling from "@infrastructure/errorHandling";
import {
    BadRequestException,
    ConfigurationErrorException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException
} from "@infrastructure/errors";
import * as responseBuilder from "@infrastructure/responseBuilder";
import { random } from "faker";

describe("Error Handling", () => {
    const callbackMock: jest.Mock<ApiCallback> = jest.fn();
    const consoleErrorMock: jest.SpyInstance = jest
        .spyOn(console, "error")
        .mockImplementation(jest.fn());

    beforeEach(() => {
        callbackMock.mockClear();
        consoleErrorMock.mockClear();
    });

    describe("Success", () => {
        it("Should call run function", async () => {
            const run = jest.fn();

            await errorHandling(run, callbackMock);

            expect(run).toHaveBeenCalledTimes(1);
        });

        it("Should NOT call callback function", async () => {
            const run = jest.fn();

            await errorHandling(run, callbackMock);

            expect(callbackMock).not.toHaveBeenCalled();
        });
    });

    describe("NotFoundException", () => {
        const notFoundMock: jest.SpyInstance<void> = jest.spyOn(responseBuilder, "notFound");

        beforeEach(() => {
            notFoundMock.mockClear();
        });

        it("Should call responseBuilder", async () => {
            const run = jest.fn(() => {
                throw new NotFoundException(random.uuid(), random.uuid());
            });

            await errorHandling(run, callbackMock);

            expect(notFoundMock).toHaveBeenCalledTimes(1);
        });

        it("Should call responseBuilder with error statusCode as first argument", async () => {
            const expectedStatusCode = random.uuid();
            const run = jest.fn(() => {
                throw new NotFoundException(expectedStatusCode, random.uuid());
            });

            await errorHandling(run, callbackMock);

            const actualStatusCode = notFoundMock.mock.calls[0][0];
            expect(actualStatusCode).toBe(expectedStatusCode);
        });
        it("Should call responseBuilder with error description as second argument", async () => {
            const expectedDescription = random.uuid();
            const run = jest.fn(() => {
                throw new NotFoundException(random.uuid(), expectedDescription);
            });

            await errorHandling(run, callbackMock);

            const actualDescription = notFoundMock.mock.calls[0][1];
            expect(actualDescription).toBe(expectedDescription);
        });
        it("Should call callback", async () => {
            const exception = new NotFoundException(random.uuid(), random.uuid());
            const run = jest.fn(() => {
                throw exception;
            });

            await errorHandling(run, callbackMock);

            expect(callbackMock).toHaveBeenCalledTimes(1);
        });

        it("Should console.error exception", async () => {
            const exception = new NotFoundException(random.uuid(), random.uuid());
            const expectedException = JSON.stringify(exception, Object.getOwnPropertyNames(exception));
            const run = jest.fn(() => {
                throw exception;
            });

            await errorHandling(run, callbackMock);

            const actualException = consoleErrorMock.mock.calls[0][0];
            expect(actualException).toStrictEqual(expectedException);
        });
    });

    describe("BadRequestException", () => {
        const badRequestMock: jest.SpyInstance<void> = jest.spyOn(responseBuilder, "badRequest");

        beforeEach(() => {
            badRequestMock.mockClear();
        });

        it("Should call responseBuilder", async () => {
            const run = jest.fn(() => {
                throw new BadRequestException(random.uuid(), random.uuid());
            });

            await errorHandling(run, callbackMock);

            expect(badRequestMock).toHaveBeenCalledTimes(1);
        });

        it("Should call responseBuilder with error statusCode as first argument", async () => {
            const expectedStatusCode = random.uuid();
            const run = jest.fn(() => {
                throw new BadRequestException(expectedStatusCode, random.uuid());
            });

            await errorHandling(run, callbackMock);

            const actualStatusCode = badRequestMock.mock.calls[0][0];
            expect(actualStatusCode).toBe(expectedStatusCode);
        });
        it("Should call responseBuilder with error description as second argument", async () => {
            const expectedDescription = random.uuid();
            const run = jest.fn(() => {
                throw new BadRequestException(random.uuid(), expectedDescription);
            });

            await errorHandling(run, callbackMock);

            const actualDescription = badRequestMock.mock.calls[0][1];
            expect(actualDescription).toBe(expectedDescription);
        });
        it("Should call callback", async () => {
            const exception = new BadRequestException(random.uuid(), random.uuid());
            const run = jest.fn(() => {
                throw exception;
            });

            await errorHandling(run, callbackMock);

            expect(callbackMock).toHaveBeenCalledTimes(1);
        });

        it("Should console.error exception", async () => {
            const exception = new BadRequestException(random.uuid(), random.uuid());
            const expectedException = JSON.stringify(exception, Object.getOwnPropertyNames(exception));
            const run = jest.fn(() => {
                throw exception;
            });

            await errorHandling(run, callbackMock);

            const actualException = consoleErrorMock.mock.calls[0][0];
            expect(actualException).toStrictEqual(expectedException);
        });
    });

    describe("ForbiddenException", () => {
        const forbiddingMock: jest.SpyInstance<void> = jest.spyOn(responseBuilder, "forbidden");

        beforeEach(() => {
            forbiddingMock.mockClear();
        });

        it("Should call responseBuilder", async () => {
            const run = jest.fn(() => {
                throw new ForbiddenException(random.uuid(), random.uuid());
            });

            await errorHandling(run, callbackMock);

            expect(forbiddingMock).toHaveBeenCalledTimes(1);
        });

        it("Should call responseBuilder with error statusCode as first argument", async () => {
            const expectedStatusCode = random.uuid();
            const run = jest.fn(() => {
                throw new ForbiddenException(expectedStatusCode, random.uuid());
            });

            await errorHandling(run, callbackMock);

            const actualStatusCode = forbiddingMock.mock.calls[0][0];
            expect(actualStatusCode).toBe(expectedStatusCode);
        });
        it("Should call responseBuilder with error description as second argument", async () => {
            const expectedDescription = random.uuid();
            const run = jest.fn(() => {
                throw new ForbiddenException(random.uuid(), expectedDescription);
            });

            await errorHandling(run, callbackMock);

            const actualDescription = forbiddingMock.mock.calls[0][1];
            expect(actualDescription).toBe(expectedDescription);
        });
        it("Should call callback", async () => {
            const exception = new ForbiddenException(random.uuid(), random.uuid());
            const run = jest.fn(() => {
                throw exception;
            });

            await errorHandling(run, callbackMock);

            expect(callbackMock).toHaveBeenCalledTimes(1);
        });

        it("Should console.error exception", async () => {
            const exception = new ForbiddenException(random.uuid(), random.uuid());
            const expectedException = JSON.stringify(exception, Object.getOwnPropertyNames(exception));
            const run = jest.fn(() => {
                throw exception;
            });

            await errorHandling(run, callbackMock);

            const actualException = consoleErrorMock.mock.calls[0][0];
            expect(actualException).toStrictEqual(expectedException);
        });
    });

    describe("ConfigurationErrorException", () => {
        const configurationErrorMock: jest.SpyInstance<void> = jest.spyOn(
            responseBuilder,
            "configurationError"
        );

        beforeEach(() => {
            configurationErrorMock.mockClear();
        });

        it("Should call responseBuilder", async () => {
            const run = jest.fn(() => {
                throw new ConfigurationErrorException(random.uuid(), random.uuid());
            });

            await errorHandling(run, callbackMock);

            expect(configurationErrorMock).toHaveBeenCalledTimes(1);
        });

        it("Should call responseBuilder with error statusCode as first argument", async () => {
            const expectedStatusCode = random.uuid();
            const run = jest.fn(() => {
                throw new ConfigurationErrorException(expectedStatusCode, random.uuid());
            });

            await errorHandling(run, callbackMock);

            const actualStatusCode = configurationErrorMock.mock.calls[0][0];
            expect(actualStatusCode).toBe(expectedStatusCode);
        });
        it("Should call responseBuilder with error description as second argument", async () => {
            const expectedDescription = random.uuid();
            const run = jest.fn(() => {
                throw new ConfigurationErrorException(random.uuid(), expectedDescription);
            });

            await errorHandling(run, callbackMock);

            const actualDescription = configurationErrorMock.mock.calls[0][1];
            expect(actualDescription).toBe(expectedDescription);
        });
        it("Should call callback", async () => {
            const exception = new ConfigurationErrorException(random.uuid(), random.uuid());
            const run = jest.fn(() => {
                throw exception;
            });

            await errorHandling(run, callbackMock);

            expect(callbackMock).toHaveBeenCalledTimes(1);
        });

        it("Should console.error exception", async () => {
            const exception = new ConfigurationErrorException(random.uuid(), random.uuid());
            const run = jest.fn(() => {
                throw exception;
            });
            const expectedException = JSON.stringify(exception, Object.getOwnPropertyNames(exception));

            await errorHandling(run, callbackMock);

            const actualException = consoleErrorMock.mock.calls[0][0];
            expect(actualException).toBe(expectedException);
        });
    });

    describe("internalServerErrorException", () => {
        const internalServerErrorMock: jest.SpyInstance<void> = jest.spyOn(
            responseBuilder,
            "internalServerError"
        );

        beforeEach(() => {
            internalServerErrorMock.mockClear();
        });

        it("Should call responseBuilder", async () => {
            const run = jest.fn(() => {
                throw new InternalServerErrorException(new Error(random.uuid()));
            });

            await errorHandling(run, callbackMock);

            expect(internalServerErrorMock).toHaveBeenCalledTimes(1);
        });

        it("Should call responseBuilder on any unhandled exception", async () => {
            const run = jest.fn(() => {
                throw new Error(random.uuid());
            });

            await errorHandling(run, callbackMock);

            expect(internalServerErrorMock).toHaveBeenCalledTimes(1);
        });
        it("Should call callback", async () => {
            const run = jest.fn(() => {
                throw new InternalServerErrorException(new Error(random.uuid()));
            });

            await errorHandling(run, callbackMock);

            expect(callbackMock).toHaveBeenCalledTimes(1);
        });

        it("Should console.error exception", async () => {
            const exception = new InternalServerErrorException(new Error(random.uuid()));
            const expectedException = JSON.stringify(exception, Object.getOwnPropertyNames(exception));
            const run = jest.fn(() => {
                throw exception;
            });

            await errorHandling(run, callbackMock);

            const actualException = consoleErrorMock.mock.calls[0][0];
            expect(actualException).toBe(expectedException);
        });
    });
});
