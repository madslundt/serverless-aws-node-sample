import {
    ApiCallback,
    ApiContext,
    ApiEvent,
} from "@infrastructure/api.interfaces";
import errorHandling from "@infrastructure/errorHandling";
import { ok } from "@infrastructure/responseBuilder";
import {
    getSampleHandler,
    IGetSampleRequest,
    IGetSampleResponse
} from "./handlers";

const getSample = async (
    event: ApiEvent,
    context: ApiContext,
    callback: ApiCallback
) => {
    await errorHandling(async () => {
        const request: IGetSampleRequest = {
            a: 1,
            b: 2
        };

        const result = getSampleHandler(request);

        ok<IGetSampleResponse>(result, callback);
    }, callback);
};



export { getSample };
