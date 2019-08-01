import apiGateway from "@shared/apiGateway";
import { getRestApiId } from "@src/swagger/helpers";
import { APIGateway, AWSError, Request } from "aws-sdk";
import { random } from "faker";

describe("getRestApiId", () => {
    const getRestApisMock: jest.SpyInstance<Request<APIGateway.Types.RestApis, AWSError>> = jest.spyOn(apiGateway, "getRestApis");

    beforeEach(() => {
        getRestApisMock.mockClear();
        getRestApisMock.mockImplementation(callback => callback(undefined, random.uuid()));
    });

    it("Should call apiGateway.getRestApis", async () => {
        await getRestApiId(random.uuid(), random.uuid());

        expect(getRestApisMock).toHaveBeenCalledTimes(1);
    });
    it("Should reject on error from apiGateway.getRestApis", async () => {
        const expectedError = random.uuid();
        getRestApisMock.mockImplementationOnce(callback => callback(expectedError, random.uuid()));

        try {
            await getRestApiId(random.uuid(), random.uuid());
            expect(false).toBeTruthy();
        } catch (exception) {
            expect(exception).toBe(expectedError);
        }
    });
    it("Should resolve apiId when data.items.name = '{stageName}-{apiName}'", async () => {
        const expectedApiId = random.uuid();
        const stageName = random.uuid();
        const apiName = random.uuid();
        const data = {
            items: [{
                id: expectedApiId,
                name: `${stageName}-${apiName}`
            }]
        };
        getRestApisMock.mockImplementationOnce(callback => callback(undefined, data));

        const actualApiId = await getRestApiId(stageName, apiName);

        expect(actualApiId).toBe(expectedApiId);
    });
    it("Should resolve undefined if data.items.name != '{stageName}-{apiName}'", async () => {
        const data = {
            items: [{
                [random.uuid()]: random.uuid(),
                id: random.uuid()
            }]
        };
        getRestApisMock.mockImplementationOnce(callback => callback(undefined, data));

        const actualApiId = await getRestApiId(random.uuid(), random.uuid());

        expect(actualApiId).toBeUndefined();
    });
    it("Should resolve undefined when data.items = null", async () => {
        const data = {};
        getRestApisMock.mockImplementationOnce(callback => callback(undefined, data));

        const actualApiId = await getRestApiId(random.uuid(), random.uuid());

        expect(actualApiId).toBeUndefined();
    });
    it("Should resolve nothing when data.items.length = 0", async () => {
        const data = {
            items: []
        };
        getRestApisMock.mockImplementationOnce(callback => callback(undefined, data));

        const actualApiId = await getRestApiId(random.uuid(), random.uuid());

        expect(actualApiId).toBeUndefined();
    });
});