import { ApiCallback } from "./api.interfaces";
import { BadRequestException, ConfigurationErrorException, ForbiddenException, NotFoundException } from "./errors";
import { badRequest, configurationError, forbidden, internalServerError, notFound } from "./responseBuilder";

const errorHandling = async (run: () => any, callback: ApiCallback): Promise<void> => {
    try {
        await run();
    } catch (exception) {
        console.error(JSON.stringify(exception, Object.getOwnPropertyNames(exception)));

        if (exception instanceof NotFoundException) {
            notFound(exception.code, exception.description, callback);
            return;
        }

        if (exception instanceof ForbiddenException) {
            forbidden(exception.code, exception.description, callback);
            return;
        }

        if (exception instanceof ConfigurationErrorException) {
            configurationError(exception.code, exception.description, callback);
            return;
        }

        if (exception instanceof BadRequestException) {
            badRequest(exception.code, exception.description, callback);
            return;
        }

        internalServerError(callback);
    }
};

export default errorHandling;
