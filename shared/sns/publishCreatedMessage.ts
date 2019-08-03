import snsPublish from "@infrastructure/snsPublish";

export interface IRequest {
    messageId: string;
}

const publishCreatedMessage = async (request: IRequest) => {
    const topic = process.env.snsTopicCreatedMessage;

    const result = await snsPublish(request, topic);

    return result;
};

export default publishCreatedMessage;
