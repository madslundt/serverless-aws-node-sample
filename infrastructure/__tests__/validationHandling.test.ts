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

    it("Should return value on valid request", () => {
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
    it("Should throw BadRequestResut on invalid request", () => {
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
            expect(exception).toBeInstanceOf(BadRequestException)
        }
    });
    it("Should call console.warn on invalid request", () => {
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
