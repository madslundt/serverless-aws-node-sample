import validationHandling from "@infrastructure/validationHandling";
import { Message } from "@shared/dynamodb";
import { IPublishCreatedMessageRequest } from "@shared/sns";
import * as Joi from "joi";

export interface IRequest extends IPublishCreatedMessageRequest {}

const schema: Joi.ObjectSchema = Joi.object({
    messageId: Joi.string().required(),
});

const handler = async (request: IRequest): Promise<void> => {
    const { messageId } = validationHandling<IRequest>(request, schema);

    await Message.update({
        messageId
    }, {
        notified: true,
        notifyDate: new Date()
    });
};

export default handler;
