import { InternalServerErrorException } from "@infrastructure/errors";
import sns from "@infrastructure/sns";
import snsPublish from "@infrastructure/snsPublish";
import { SNS } from "aws-sdk";
import { random } from "faker";

describe("snsPublish", () => {
    const snsPublishMock: jest.SpyInstance = jest.spyOn(sns, "publish");
    const consoleErrorMock: jest.SpyInstance = jest
        .spyOn(console, "error")
        .mockImplementation(jest.fn());

    beforeEach(() => {
        snsPublishMock.mockClear();
        consoleErrorMock.mockClear();
    });

    it("Should throw InternalServerErrorException when process.env.SNS_TOPIC_ARN is undefined", async () => {
        try {
            await snsPublish(random.uuid(), random.uuid());
            expect(true).toBeFalsy();
        } catch (exception) {
            expect(exception).toBeInstanceOf(InternalServerErrorException);
        }
    });
    it("Should throw InternalServerErrorException when process.env.SNS_TOPIC_ARN is empty string", async () => {
        process.env.SNS_TOPIC_ARN = "";

        try {
            await snsPublish(random.uuid(), random.uuid());
            expect(true).toBeFalsy();
        } catch (exception) {
            expect(exception).toBeInstanceOf(InternalServerErrorException);
        }
    });
    it("Should throw InternalServerErrorException when input topic is null", async () => {
        process.env.SNS_TOPIC_ARN = random.uuid();

        try {
            await snsPublish(random.uuid());
            expect(true).toBeFalsy();
        } catch (exception) {
            expect(exception).toBeInstanceOf(InternalServerErrorException);
        }
    });
    it("Should throw InternalServerErrorException when input topic is empty string", async () => {
        process.env.SNS_TOPIC_ARN = random.uuid();

        try {
            await snsPublish(random.uuid(), "");
            expect(true).toBeFalsy();
        } catch (exception) {
            expect(exception).toBeInstanceOf(InternalServerErrorException);
        }
    });

    it("Should call sns.publish once", async () => {
        process.env.SNS_TOPIC_ARN = random.uuid();

        await snsPublish(random.uuid(), random.uuid());

        expect(snsPublishMock).toHaveBeenCalledTimes(1);
    });
    it("Should call sns.publish once when message is undefined", async () => {
        process.env.SNS_TOPIC_ARN = random.uuid();

        await snsPublish(undefined, random.uuid());

        expect(snsPublishMock).toHaveBeenCalledTimes(1);
    });
    it("Should call sns.publish with message", async () => {
        const message = {
            id: random.uuid()
        };
        const expectedMessage = JSON.stringify(message);
        process.env.SNS_TOPIC_ARN = random.uuid();

        await snsPublish(message, random.uuid());

        const request: SNS.Types.PublishInput = snsPublishMock.mock.calls[0][0];
        const actualMessage = request.Message;
        expect(actualMessage).toEqual(expectedMessage);
    });
    it("Should call sns.publish with topicArn", async () => {
        const topicArn = random.uuid();
        const topic = random.uuid();
        const expectedTopicArn = `${topicArn}:${topic}`;
        process.env.SNS_TOPIC_ARN = topicArn;

        await snsPublish(random.uuid(), topic);

        const request: SNS.Types.PublishInput = snsPublishMock.mock.calls[0][0];
        const actualTopicArn = request.TopicArn;
        expect(actualTopicArn).toEqual(expectedTopicArn);
    });
    it("Should call console.error once when sns.publish calls error function", async () => {
        const expectedErrorMessage = random.uuid();
        process.env.SNS_TOPIC_ARN = random.uuid();
        snsPublishMock.mockImplementationOnce((_, error) => error(expectedErrorMessage));

        await snsPublish(random.uuid(), random.uuid());

        expect(consoleErrorMock).toHaveBeenCalledTimes(1);
    });
});
