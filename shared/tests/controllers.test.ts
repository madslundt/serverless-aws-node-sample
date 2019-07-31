import * as errorHandling from "@shared/errorHandling";
import { BadRequestException } from "@shared/errors";
import { random } from "faker";

// tslint:disable-next-line: no-var-requires
const controllers = require("require-all")({
    dirname     :  __dirname + "/../../src",
    filter      :  /(.+Controller)\.(js|ts)$/,
    recursive   : true
}) as any;

// tslint:disable-next-line: ban-types
const findFunctionsRecursively = (obj: any): Function[] => {
    // tslint:disable-next-line: ban-types
    const result: Function[] = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const item = obj[key];
            if (typeof item === "function") {
                result.push(item);
            } else {
                result.push(...findFunctionsRecursively(item));
            }
        }
    }

    return result.filter(c => c.name.indexOf("Controller") !== -1);
};

describe("Controllers", () => {
    const errorHandlingMock: jest.SpyInstance  = jest.spyOn(errorHandling, "default");

    beforeEach(() => {
        errorHandlingMock.mockClear();
    });

    it("All controllers must use errorHandling", async () => {
        const functions = findFunctionsRecursively(controllers);

        for (const func of functions) {
            const expectedCode = random.uuid();
            const expectedDescription = random.uuid();
            errorHandlingMock.mockImplementation(() => {
                throw new BadRequestException(expectedCode, expectedDescription);
            });

            try {
                errorHandlingMock.mockClear();
                await func();
                console.error(func.name);
                expect(false).toBeTruthy();
            } catch (exception) {
                if (exception instanceof BadRequestException) {
                    expect(exception.code).toBe(expectedCode);
                    expect(exception.description).toBe(expectedDescription);
                } else {
                    console.error(func.name);
                    expect(false).toBeTruthy();
                }
            } finally {
                expect(errorHandlingMock).toHaveBeenCalledTimes(1);
            }
        }
    });
});
