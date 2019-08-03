import { ApiCallback, ApiResponse, IErrorResponseBody } from "./api.interfaces";
import {
    ApiException,
    BadRequestException,
    ConfigurationErrorException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException
} from "./errors";
import { HttpStatusCode } from "./httpStatusCodes";

const returnAs = <T>(result: T, statusCode: number, callback: ApiCallback): void => {
    const bodyObject: IErrorResponseBody | T = result instanceof ApiException
      ? { error: result }
      : result;

    const response: ApiResponse = {
        body: JSON.stringify(bodyObject),
        headers: {
            // Uncomment line below if AWS API Gateway Proxy Integration is used
            // "Access-Control-Allow-Origin": "*"
        },
        statusCode
    };

    callback(undefined, response);
};

const badRequest = (code: string, description: string, callback: ApiCallback): void => {
    const errorResult: BadRequestException = new BadRequestException(code, description);
    returnAs<BadRequestException>(errorResult, HttpStatusCode.BadRequest, callback);
};

const configurationError = (code: string, description: string, callback: ApiCallback): void => {
    const errorResult: ConfigurationErrorException = new ConfigurationErrorException(
        code,
        description
    );
    returnAs<ConfigurationErrorException>(errorResult, HttpStatusCode.ConfigurationError, callback);
};

const forbidden = (code: string, description: string, callback: ApiCallback): void => {
    const errorResult: ForbiddenException = new ForbiddenException(code, description);
    returnAs<ForbiddenException>(errorResult, HttpStatusCode.Forbidden, callback);
};

const internalServerError = (callback: ApiCallback): void => {
    const errorResult: InternalServerErrorException = new InternalServerErrorException(
        "Internal server error"
    );
    returnAs<InternalServerErrorException>(
        errorResult,
        HttpStatusCode.InternalServerError,
        callback
    );
};

const notFound = (code: string, description: string, callback: ApiCallback): void => {
    const errorResult: NotFoundException = new NotFoundException(code, description);
    returnAs<NotFoundException>(errorResult, HttpStatusCode.NotFound, callback);
};

const ok = <T>(result: T, callback: ApiCallback): void => {
    returnAs<T>(result, HttpStatusCode.Ok, callback);
};

export { badRequest, configurationError, forbidden, internalServerError, notFound, ok };
