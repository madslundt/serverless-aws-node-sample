import {
    ApiContext,
    ApiEvent,
    ApiHandler,
    ApiResponse,
    IErrorResponseBody
} from "@infrastructure/api.interfaces";
import parseJson from "@shared/helpers/parseJson";

type SuccessCaller = <T>(
    handler: ApiHandler,
    event?: ApiEvent,
    context?: ApiContext
) => Promise<IApiResponseParsed<T>>;
type FailureCaller = (
    handler: ApiHandler,
    event?: ApiEvent,
    context?: ApiContext
) => Promise<IApiErrorResponseParsed>;

export interface IApiResponseParsed<T> extends ApiResponse {
    parsedBody: T;
}

export interface IApiErrorResponseParsed extends ApiResponse {
    parsedBody: IErrorResponseBody;
}

export interface IPathParameter {
    [name: string]: string;
}

const callSuccess: SuccessCaller = <T>(
    handler: ApiHandler,
    event?: ApiEvent,
    context?: ApiContext
): Promise<IApiResponseParsed<T>> =>
    new Promise((resolve, reject) => {
        handler(
            event || ({} as ApiEvent),
            context || ({} as ApiContext),
            (error?: Error | null | string, result?: ApiResponse): void => {
                if (typeof result === "undefined") {
                    reject("No result was returned by the handler!");
                    return;
                }

                const parsedResult: IApiResponseParsed<T> = result as IApiResponseParsed<T>;
                parsedResult.parsedBody = parseJson(result.body) as T;
                resolve(parsedResult);
            }
        );
    });

const callFailure: FailureCaller = (
    handler: ApiHandler,
    event?: ApiEvent,
    context?: ApiContext
): Promise<IApiErrorResponseParsed> =>
    new Promise((resolve, reject) => {
        handler(
            event || ({} as ApiEvent),
            context || ({} as ApiContext),
            (error?: Error | null | string, result?: ApiResponse): void => {
                if (typeof result === "undefined") {
                    reject("No result was returned by the handler!");
                    return;
                }

                const parsedResult: IApiErrorResponseParsed = result as IApiErrorResponseParsed;
                parsedResult.parsedBody = parseJson(result.body) as IErrorResponseBody;
                resolve(parsedResult);
            }
        );
    });

export { callFailure, callSuccess };
