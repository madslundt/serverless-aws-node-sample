import { ApiCallback, ApiContext, ApiEvent } from "@infrastructure/api.interfaces";
import errorHandling from "@infrastructure/errorHandling";
import { ok } from "@infrastructure/responseBuilder";
import parseJson from "@shared/helpers/parseJson";
import { SNSEvent } from "aws-lambda";
import {
    createMessageHandler,
    getMessageInfoHandler,
    ICreateMessageHandlerRequest,
    IGetMessageInfoRequest,
    IMessageNotifyRequest,
    messageNotifyHandler
} from "./handlers";

const createMessage = async (event: ApiEvent, context: ApiContext, callback: ApiCallback) => {
    await errorHandling(async () => {
        const body = parseJson<{message: string}>(event.body);

        const request = {
            message: body && body.message,
            userId: event.pathParameters && event.pathParameters.userId
        } as ICreateMessageHandlerRequest;

        const result = await createMessageHandler(request);

        ok(result, callback);
    }, callback);
};

const messageNotify = async (event: SNSEvent, context: ApiContext, callback: ApiCallback) => {
    await errorHandling(async () => {
        const request = parseJson<IMessageNotifyRequest>(event.Records[0].Sns.Message) as IMessageNotifyRequest;

        await messageNotifyHandler(request);

        ok(null, callback);
    }, callback);
};

const getMessageInfo = async (event: ApiEvent, context: ApiContext, callback: ApiCallback) => {
    await errorHandling(async () => {
        const request = {
            messageId: event.pathParameters && event.pathParameters.messageId
        } as IGetMessageInfoRequest;

        const result = await getMessageInfoHandler(request);

        ok(result, callback);
    }, callback);
};

export { createMessage, messageNotify, getMessageInfo };
