import { InternalServerErrorException } from "@infrastructure/errors";
import sns from "@infrastructure/sns";
import { SNS } from "aws-sdk";

const snsPublish = async (message: any, topic?: string) => {
    if (!process.env.SNS_TOPIC_ARN || !topic) {
        throw new InternalServerErrorException(
            `TopicArn (Topic = '${topic}') is not specified when publishing message via SNS.`
        );
    }

    const request: SNS.Types.PublishInput = {
        Message: JSON.stringify(message),
        TopicArn: `${process.env.SNS_TOPIC_ARN}:${topic}`
    };

    const result = sns.publish(request, error => {
        if (error) {
            console.error(error);
        }
    });

    return result;
};

export default snsPublish;
