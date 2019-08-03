import { ApiCallback, ApiResponse, IErrorResponseBody } from "@infrastructure/api.interfaces";
import { BadRequestException, ConfigurationErrorException, ForbiddenException, InternalServerErrorException, NotFoundException } from "@infrastructure/errors";
import { HttpStatusCode } from "@infrastructure/httpStatusCodes";
import * as responseBuilder from "@infrastructure/responseBuilder";
import { random } from "faker";

describe("ResponseBuilder", () => {
    const callbackMock: jest.Mock<ApiCallback> = jest.fn();

    beforeEach(() => {
        callbackMock.mockClear();
    });

    describe("badRequest", () => {
        it("Should call callback with error = undefined", () => {
            responseBuilder.badRequest(random.uuid(), random.uuid(), callbackMock);

            const actualError = callbackMock.mock.calls[0][0];
            expect(actualError).toBeUndefined();
        });
        it("Should call callback with statusCode = BadRequest", () => {
            const expectedStatusCode = HttpStatusCode.BadRequest;

            responseBuilder.badRequest(random.uuid(), random.uuid(), callbackMock);

            const result: ApiResponse = callbackMock.mock.calls[0][1];
            const actualStatusCode = result.statusCode;
            expect(actualStatusCode).toBe(expectedStatusCode);
        });
        it("Should call callback with headers = {}", () => {
            const expectedHeaders = {};

            responseBuilder.badRequest(random.uuid(), random.uuid(), callbackMock);

            const result: ApiResponse = callbackMock.mock.calls[0][1];
            const actualHeaders = result.headers;
            expect(actualHeaders).toStrictEqual(expectedHeaders);
        });
        it("Should call callback with body", () => {
            const code = random.uuid();
            const description = random.uuid();
            const error = new BadRequestException(code, description);
            const body: IErrorResponseBody = {
                error
            };
            const expectedBody = JSON.stringify(body);

            responseBuilder.badRequest(code, description, callbackMock);

            const result: ApiResponse = callbackMock.mock.calls[0][1];
            const actualBody = result.body;
            expect(actualBody).toStrictEqual(expectedBody);
        });
    });
    describe("configurationError", () => {
        it("Should call callback with error = undefined", () => {
            responseBuilder.configurationError(random.uuid(), random.uuid(), callbackMock);

            const actualError = callbackMock.mock.calls[0][0];
            expect(actualError).toBeUndefined();
        });
        it("Should call callback with statusCode = ConfigurationError", () => {
            const expectedStatusCode = HttpStatusCode.ConfigurationError;

            responseBuilder.configurationError(random.uuid(), random.uuid(), callbackMock);

            const result: ApiResponse = callbackMock.mock.calls[0][1];
            const actualStatusCode = result.statusCode;
            expect(actualStatusCode).toBe(expectedStatusCode);
        });
        it("Should call callback with headers = {}", () => {
            const expectedHeaders = {};

            responseBuilder.configurationError(random.uuid(), random.uuid(), callbackMock);

            const result: ApiResponse = callbackMock.mock.calls[0][1];
            const actualHeaders = result.headers;
            expect(actualHeaders).toStrictEqual(expectedHeaders);
        });
        it("Should call callback with body", () => {
            const code = random.uuid();
            const description = random.uuid();
            const error = new ConfigurationErrorException(code, description);
            const body: IErrorResponseBody = {
                error
            };
            const expectedBody = JSON.stringify(body);

            responseBuilder.configurationError(code, description, callbackMock);

            const result: ApiResponse = callbackMock.mock.calls[0][1];
            const actualBody = result.body;
            expect(actualBody).toStrictEqual(expectedBody);
        });
    });
    describe("forbidden", () => {
        it("Should call callback with error = undefined", () => {
            responseBuilder.forbidden(random.uuid(), random.uuid(), callbackMock);

            const actualError = callbackMock.mock.calls[0][0];
            expect(actualError).toBeUndefined();
        });
        it("Should call callback with statusCode = Forbidden", () => {
            const expectedStatusCode = HttpStatusCode.Forbidden;

            responseBuilder.forbidden(random.uuid(), random.uuid(), callbackMock);

            const result: ApiResponse = callbackMock.mock.calls[0][1];
            const actualStatusCode = result.statusCode;
            expect(actualStatusCode).toBe(expectedStatusCode);
        });
        it("Should call callback with headers = {}", () => {
            const expectedHeaders = {};

            responseBuilder.forbidden(random.uuid(), random.uuid(), callbackMock);

            const result: ApiResponse = callbackMock.mock.calls[0][1];
            const actualHeaders = result.headers;
            expect(actualHeaders).toStrictEqual(expectedHeaders);
        });
        it("Should call callback with body", () => {
            const code = random.uuid();
            const description = random.uuid();
            const error = new ForbiddenException(code, description);
            const body: IErrorResponseBody = {
                error
            };
            const expectedBody = JSON.stringify(body);

            responseBuilder.forbidden(code, description, callbackMock);

            const result: ApiResponse = callbackMock.mock.calls[0][1];
            const actualBody = result.body;
            expect(actualBody).toStrictEqual(expectedBody);
        });
    });
    describe("notFound", () => {
        it("Should call callback with error = undefined", () => {
            responseBuilder.notFound(random.uuid(), random.uuid(), callbackMock);

            const actualError = callbackMock.mock.calls[0][0];
            expect(actualError).toBeUndefined();
        });
        it("Should call callback with statusCode = NotFound", () => {
            const expectedStatusCode = HttpStatusCode.NotFound;

            responseBuilder.notFound(random.uuid(), random.uuid(), callbackMock);

            const result: ApiResponse = callbackMock.mock.calls[0][1];
            const actualStatusCode = result.statusCode;
            expect(actualStatusCode).toBe(expectedStatusCode);
        });
        it("Should call callback with headers = {}", () => {
            const expectedHeaders = {};

            responseBuilder.notFound(random.uuid(), random.uuid(), callbackMock);

            const result: ApiResponse = callbackMock.mock.calls[0][1];
            const actualHeaders = result.headers;
            expect(actualHeaders).toStrictEqual(expectedHeaders);
        });
        it("Should call callback with body", () => {
            const code = random.uuid();
            const description = random.uuid();
            const error = new NotFoundException(code, description);
            const body: IErrorResponseBody = {
                error
            };
            const expectedBody = JSON.stringify(body);

            responseBuilder.notFound(code, description, callbackMock);

            const result: ApiResponse = callbackMock.mock.calls[0][1];
            const actualBody = result.body;
            expect(actualBody).toStrictEqual(expectedBody);
        });
    });
    describe("internalServerError", () => {
        it("Should call callback with error = undefined", () => {
            responseBuilder.internalServerError(callbackMock);

            const actualError = callbackMock.mock.calls[0][0];
            expect(actualError).toBeUndefined();
        });
        it("Should call callback with statusCode = InternalServerError", () => {
            const expectedStatusCode = HttpStatusCode.InternalServerError;

            responseBuilder.internalServerError(callbackMock);

            const result: ApiResponse = callbackMock.mock.calls[0][1];
            const actualStatusCode = result.statusCode;
            expect(actualStatusCode).toBe(expectedStatusCode);
        });
        it("Should call callback with headers = {}", () => {
            const expectedHeaders = {};

            responseBuilder.internalServerError(callbackMock);

            const result: ApiResponse = callbackMock.mock.calls[0][1];
            const actualHeaders = result.headers;
            expect(actualHeaders).toStrictEqual(expectedHeaders);
        });
        it("Should call callback with body", () => {
            const error = new InternalServerErrorException("Internal server error");
            const body: IErrorResponseBody = {
                error
            };
            const expectedBody = JSON.stringify(body);

            responseBuilder.internalServerError(callbackMock);

            const result: ApiResponse = callbackMock.mock.calls[0][1];
            const actualBody = result.body;
            expect(actualBody).toStrictEqual(expectedBody);
        });
    });
    describe("ok", () => {
        it("Should call callback with error = undefined", () => {
            responseBuilder.ok(random.uuid(), callbackMock);

            const actualError = callbackMock.mock.calls[0][0];
            expect(actualError).toBeUndefined();
        });
        it("Should call callback with statusCode = Ok", () => {
            const expectedStatusCode = HttpStatusCode.Ok;

            responseBuilder.ok(random.uuid(), callbackMock);

            const result: ApiResponse = callbackMock.mock.calls[0][1];
            const actualStatusCode = result.statusCode;
            expect(actualStatusCode).toBe(expectedStatusCode);
        });
        it("Should call callback with headers = {}", () => {
            const expectedHeaders = {};

            responseBuilder.ok(random.uuid(), callbackMock);

            const result: ApiResponse = callbackMock.mock.calls[0][1];
            const actualHeaders = result.headers;
            expect(actualHeaders).toStrictEqual(expectedHeaders);
        });
        it("Should call callback with body", () => {
            const body = {
                id: random.uuid()
            };
            const expectedBody = JSON.stringify(body);

            responseBuilder.ok(body, callbackMock);

            const result: ApiResponse = callbackMock.mock.calls[0][1];
            const actualBody = result.body;
            expect(actualBody).toStrictEqual(expectedBody);
        });
    });
});
