
import { ObjectSchema, validate } from "joi";
import { BadRequestException } from "./errors";

const validationHandling = <T>(request: T, schema: ObjectSchema): T => {
    const { value, error } = validate<T>(request, schema);

    if (!!error) {
        console.warn(error);
        throw new BadRequestException(error.name, error.message);
    }

    return value;
};

export default validationHandling;
