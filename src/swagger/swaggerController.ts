import { ApiCallback, ApiContext, ApiEvent } from "@shared/api.interfaces";
import errorHandling from "@shared/errorHandling";
import { ok } from "@shared/responseBuilder";
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
