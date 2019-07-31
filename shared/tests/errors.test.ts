import {
    ApiException,
    BadRequestException,
    ConfigurationErrorException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException
} from "@shared/errors";
import { random } from "faker";

describe("errors", () => {
    describe("BadRequestException", () => {
        it("Should be an instance of ApiException", () => {
            const exception = new BadRequestException(random.uuid(), random.uuid());

            expect(exception instanceof ApiException).toBeTruthy();
        });
        it("Should set code in ApiException", () => {
            const expectedCode = random.uuid();

            const exception = new BadRequestException(expectedCode, random.uuid());

            const actualCode = exception.code;
            expect(actualCode).toBe(expectedCode);
        });
        it("Should set description in ApiException", () => {
            const expectedDescription = random.uuid();

            const exception = new BadRequestException(random.uuid(), expectedDescription);

            const actualDescription = exception.description;
            expect(actualDescription).toBe(expectedDescription);
        });
    });
    describe("ConfigurationErrorException", () => {
        it("Should be an instance of ApiException", () => {
            const exception = new ConfigurationErrorException(random.uuid(), random.uuid());

            expect(exception instanceof ApiException).toBeTruthy();
        });
        it("Should set code in ApiException", () => {
            const expectedCode = random.uuid();

            const exception = new ConfigurationErrorException(expectedCode, random.uuid());

            const actualCode = exception.code;
            expect(actualCode).toBe(expectedCode);
        });
        it("Should set description in ApiException", () => {
            const expectedDescription = random.uuid();

            const exception = new ConfigurationErrorException(random.uuid(), expectedDescription);

            const actualDescription = exception.description;
            expect(actualDescription).toBe(expectedDescription);
        });
    });
    describe("ForbiddenException", () => {
        it("Should be an instance of ApiException", () => {
            const exception = new ForbiddenException(random.uuid(), random.uuid());

            expect(exception instanceof ApiException).toBeTruthy();
        });
        it("Should set code in ApiException", () => {
            const expectedCode = random.uuid();

            const exception = new ForbiddenException(expectedCode, random.uuid());

            const actualCode = exception.code;
            expect(actualCode).toBe(expectedCode);
        });
        it("Should set description in ApiException", () => {
            const expectedDescription = random.uuid();

            const exception = new ForbiddenException(random.uuid(), expectedDescription);

            const actualDescription = exception.description;
            expect(actualDescription).toBe(expectedDescription);
        });
    });
    describe("InternalServerErrorException", () => {
        it("Should be an instance of ApiException", () => {
            const exception = new InternalServerErrorException(random.uuid());

            expect(exception instanceof ApiException).toBeTruthy();
        });
        it("Should set Error.name as ApiException.code", () => {
            const expectedCode = random.uuid();
            const error = new Error();
            error.name = expectedCode;

            const exception = new InternalServerErrorException(error);

            const actualCode = exception.code;
            expect(actualCode).toBe(expectedCode);
        });
        it("Should set JSON stringify Error into ApiException.description", () => {
            const error = new Error(random.uuid());
            error.name = random.uuid();
            const expectedDescription = JSON.stringify(error, Object.getOwnPropertyNames(error));

            const exception = new InternalServerErrorException(error);

            const actualDescription = exception.description;
            expect(actualDescription).toBe(expectedDescription);
        });
        it("Should set error of type string into ApiException.code", () => {
            const expectedCode = random.uuid();

            const exception = new InternalServerErrorException(expectedCode);

            const actualCode = exception.code;
            expect(actualCode).toBe(expectedCode);
        });
        it("Should set JSON stringify error of type string into ApiException.description", () => {
            const code = random.uuid();
            const expectedDescription = JSON.stringify(code, Object.getOwnPropertyNames(code));

            const exception = new InternalServerErrorException(code);

            const actualDescriptin = exception.description;
            expect(actualDescriptin).toBe(expectedDescription);
        });
    });
    describe("NotFoundException", () => {
        it("Should be an instance of ApiException", () => {
            const exception = new NotFoundException(random.uuid(), random.uuid());

            expect(exception instanceof ApiException).toBeTruthy();
        });
        it("Should set code in ApiException", () => {
            const expectedCode = random.uuid();

            const exception = new NotFoundException(expectedCode, random.uuid());

            const actualCode = exception.code;
            expect(actualCode).toBe(expectedCode);
        });
        it("Should set description in ApiException", () => {
            const expectedDescription = random.uuid();

            const exception = new NotFoundException(random.uuid(), expectedDescription);

            const actualDescription = exception.description;
            expect(actualDescription).toBe(expectedDescription);
        });
    });
});
