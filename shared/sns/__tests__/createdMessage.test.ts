import * as snsPublish from "@infrastructure/snsPublish";
import { publishCreatedMessage, IPublishCreatedMessageRequest } from "@shared/sns";
import { random } from "faker";

describe("publishCreatedMessage", () => {
    const snsPublishMock: jest.SpyInstance = jest.spyOn(snsPublish, "default").mockImplementation(
        (message: any, topic: any) =>
            new Promise(resolve => {
                resolve();
            })
    );

    beforeEach(() => {
        snsPublishMock.mockClear();
    });

    it("Should call snsPublish once", async () => {
        const request = {} as IPublishCreatedMessageRequest;

        await publishCreatedMessage(request);

        expect(snsPublishMock).toHaveBeenCalledTimes(1);
    });
    it("Should call snsPublish with request", async () => {
        const expectedRequest = {
            messageId: random.uuid()
        } as IPublishCreatedMessageRequest;

        await publishCreatedMessage(expectedRequest);

        const actualRequest = snsPublishMock.mock.calls[0][0];
        expect(actualRequest).toStrictEqual(expectedRequest);
    });
    it("Should call snsPublish with process.env.snsTopicCreatedMessage", async () => {
        const expectedTopic = random.uuid();
        process.env.snsTopicCreatedMessage = expectedTopic;
        const request = {
            messageId: random.uuid()
        } as IPublishCreatedMessageRequest;

        await publishCreatedMessage(request);

        const actualTopic = snsPublishMock.mock.calls[0][1];
        expect(actualTopic).toStrictEqual(expectedTopic);
    });
    it("Should return result from snsPublish", async () => {
        const expectedResult = {
            id: random.uuid()
        };
        const request = {} as IPublishCreatedMessageRequest;
        snsPublishMock.mockImplementationOnce(() => expectedResult);

        const actualResult = await publishCreatedMessage(request);

        expect(actualResult).toStrictEqual(expectedResult);
    });
});
