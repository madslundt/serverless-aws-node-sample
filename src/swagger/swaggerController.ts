import { ApiCallback, ApiContext, ApiEvent } from "@infrastructure/api.interfaces";
import errorHandling from "@infrastructure/errorHandling";
import { ok } from "@infrastructure/responseBuilder";
import { getSwaggerJsonHandler, IGetSwaggerJsonResponse } from "./handlers";

const getSwaggerJson = async (
    event: ApiEvent,
    context: ApiContext,
    callback: ApiCallback
) => {
    await errorHandling(async () => {
        const result = await getSwaggerJsonHandler();

        ok<IGetSwaggerJsonResponse>(result, callback);
    }, callback);
};

export { getSwaggerJson };
