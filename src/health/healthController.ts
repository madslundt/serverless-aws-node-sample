import {
    ApiCallback,
    ApiContext,
    ApiEvent,
} from "@infrastructure/api.interfaces";
import errorHandling from "@infrastructure/errorHandling";
import { ok } from "@infrastructure/responseBuilder";
import {
    getHealthCheckDetailedHandler,
    getHealthCheckHandler,
    IGetHealthCheckDetailedRequest,
    IGetHealthCheckDetailedResponse,
    IGetHealthCheckResponse
} from "./handlers";

const getHealthCheck = async (
    event: ApiEvent,
    context: ApiContext,
    callback: ApiCallback
) => {
    await errorHandling(async () => {
        const result = getHealthCheckHandler();

        ok<IGetHealthCheckResponse>(result, callback);
    }, callback);
};

const getHealthCheckDetailed = async (
    event: ApiEvent,
    context: ApiContext,
    callback: ApiCallback
) => {
    await errorHandling(async () => {
        const request: IGetHealthCheckDetailedRequest = {
            requestId: event.requestContext.requestId
        };

        const result = getHealthCheckDetailedHandler(request);

        ok<IGetHealthCheckDetailedResponse>(result, callback);
    }, callback);
};

export { getHealthCheck, getHealthCheckDetailed };
