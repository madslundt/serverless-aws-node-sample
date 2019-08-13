import { ObjectSchema } from "joi";
// tslint:disable-next-line: no-var-requires TODO
const joiToJson = require("joi-to-json-schema");
import { BadRequestException } from "./errors";

const validationHandling = <T>(request: T | null | undefined, schema: ObjectSchema): T => {
    if (!request) {
        throw new BadRequestException("Request was undefined", `Must follow schema: ${joiToJson(schema)}`);
    } else if (typeof request !== "object") {
        throw new BadRequestException("Request was not an object", `Must follow schema: ${joiToJson(schema)}`);
    }

    const { value, error } = schema.validate<T>(request);

    if (!!error) {
        console.warn(error);
        throw new BadRequestException(error.name, error.message);
    }

    return value;
};

export default validationHandling;
