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
        const request = {
            a: event.pathParameters && Number(event.pathParameters.a),
            b: event.pathParameters && Number(event.pathParameters.b)
        } as IGetSampleRequest;

        const result = getSampleHandler(request);

        ok<IGetSampleResponse>(result, callback);
    }, callback);
};



export { getSample };
