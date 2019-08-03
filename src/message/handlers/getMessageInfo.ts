import { NotFoundException } from "@infrastructure/errors";
import validationHandling from "@infrastructure/validationHandling";
import { Message } from "@shared/dynamodb";
import * as Joi from "joi";

export interface IRequest {
    messageId: string;
}

export interface IResponse {
    createdDate: Date;
    updatedDate?: Date;
    notified: boolean;
    notifyDate?: Date;
}

const schema: Joi.ObjectSchema = Joi.object({
    messageId: Joi.string().required(),
});

const handler = async (request: IRequest): Promise<IResponse> => {
    const { messageId } = validationHandling<IRequest>(request, schema);

    // Get from db
    const message = await Message.get({
        messageId
    });

    if (!message) {
        throw new NotFoundException("Message was not found", `Could not find messageId = '${messageId}'`);
    }

    const result: IResponse = {
        createdDate: message.createdDate,
        updatedDate: message.updatedDate,
        notified: message.notified,
        notifyDate: message.notifyDate
    };

    return result;
};

export default handler;
