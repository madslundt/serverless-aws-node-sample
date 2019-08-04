import { BadRequestException } from "@infrastructure/errors";
import validationHandling from "@infrastructure/validationHandling";
import { random } from "faker";
import * as Joi from "joi";

describe("Validation Handling", () => {
    const consoleWarnMock: jest.SpyInstance = jest
        .spyOn(console, "warn")
        .mockImplementation(jest.fn());

    beforeEach(() => {
        consoleWarnMock.mockClear();
    });

    it("Should return value when request is valid", () => {
        const expectedRequest = {
            id: random.number({ min: 1 })
        };
        const schema: Joi.ObjectSchema = Joi.object().keys({
            id: Joi.number()
                .min(1)
                .required()
        });

        const actualRequest = validationHandling(expectedRequest, schema);

        expect(actualRequest).toStrictEqual(expectedRequest);
    });
    it("Should throw BadRequestResut when request does not follow the schema", () => {
        const expectedRequest = {
            id: random.number({ max: 0 })
        };
        const schema: Joi.ObjectSchema = Joi.object().keys({
            id: Joi.number()
                .min(1)
                .required()
        });

        try {
            validationHandling(expectedRequest, schema);
            expect(false).toBeTruthy();
        } catch (exception) {
            expect(exception).toBeInstanceOf(BadRequestException);
        }
    });
    it("Should throw BadRequestResut when request is null", () => {
        const schema: Joi.ObjectSchema = Joi.object().keys({
            id: Joi.number()
                .min(1)
                .required()
        });

        try {
            validationHandling(null, schema);
            expect(false).toBeTruthy();
        } catch (exception) {
            console.log(exception);
            expect(exception).toBeInstanceOf(BadRequestException);
        }
    });
    it("Should throw BadRequestResut when request is undefined", () => {
        const schema: Joi.ObjectSchema = Joi.object().keys({
            id: Joi.number()
                .min(1)
                .required()
        });

        try {
            validationHandling(undefined, schema);
            expect(false).toBeTruthy();
        } catch (exception) {
            expect(exception).toBeInstanceOf(BadRequestException);
        }
    });
    it("Should throw BadRequestResut when request is not an object", () => {
        const schema: Joi.ObjectSchema = Joi.object().keys({
            id: Joi.number()
                .min(1)
                .required()
        });

        try {
            validationHandling(random.uuid(), schema);
            expect(false).toBeTruthy();
        } catch (exception) {
            expect(exception).toBeInstanceOf(BadRequestException);
        }
    });
    it("Should call console.warn request does not follow the schema", () => {
        const expectedRequest = {
            id: random.number({ max: 0 })
        };
        const schema: Joi.ObjectSchema = Joi.object().keys({
            id: Joi.number()
                .min(1)
                .required()
        });

        try {
            validationHandling(expectedRequest, schema);
            expect(false).toBeTruthy();
        } catch (exception) {
            expect(consoleWarnMock).toHaveBeenCalledTimes(1);
        }
    });
});
