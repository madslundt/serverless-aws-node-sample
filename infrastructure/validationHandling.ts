import { ObjectSchema, validate } from "joi";
import schemaToJson from "joi-to-json-schema";
import { BadRequestException } from "./errors";

const validationHandling = <T>(request: T | string | null | undefined, schema: ObjectSchema): T => {
    if (!request) {
        throw new BadRequestException("Request was undefined", `Must follow schema ${schemaToJson(schema)}`);
    } else if (typeof request !== "object") {
        throw new BadRequestException("Request was not an object", `Must follow schema ${schemaToJson(schema)}`);
    }

    const { value, error } = validate<T>(request, schema);

    if (!!error) {
        console.warn(error);
        throw new BadRequestException(error.name, error.message);
    }

    return value;
};

export default validationHandling;
