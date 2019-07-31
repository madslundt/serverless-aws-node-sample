import { BadRequestException } from "@shared/errors";
import validationHandling from "@shared/validationHandling";
import { random } from "faker";
import * as Joi from "joi";

describe("Validation Handling", () => {
    const consoleErrorMock: jest.SpyInstance = jest
        .spyOn(console, "warn")
        .mockImplementation(jest.fn());

        beforeEach(() => {
        consoleErrorMock.mockClear();
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
        } catch (exception) {
            expect(exception instanceof BadRequestException).toBeTruthy();
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
        } catch (exception) {
            expect(consoleErrorMock).toHaveBeenCalledTimes(1);
        }
    });
});
