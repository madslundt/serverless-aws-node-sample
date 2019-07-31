import {
    ApiCallback,
    ApiContext,
    ApiEvent,
} from "@shared/api.interfaces";
import errorHandling from "@shared/errorHandling";
import { ok } from "@shared/responseBuilder";
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
