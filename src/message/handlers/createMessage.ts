import validationHandling from "@infrastructure/validationHandling";
import { IMessage, Message } from "@shared/dynamodb/message";
import { publishCreatedMessage } from "@shared/sns";
import * as Joi from "joi";

export interface IRequest {
    message: string;
    userId: string;
}

export interface IResponse {
    messageId: string;
}

const schema: Joi.ObjectSchema = Joi.object({
    message: Joi.string().min(2).required(),
    userId: Joi.string().min(2).required()
});

const handler = async (request: IRequest): Promise<IResponse> => {
    const value = validationHandling<IRequest>(request, schema);

    // Insert into db
    const { messageId } = await Message.create({
        message: value.message,
    } as IMessage);

    await publishCreatedMessage({
        messageId
    });

    const result: IResponse = {
        messageId
    };

    return result;
};

export default handler;
