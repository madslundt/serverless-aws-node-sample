import apiGateway from "@shared/apiGateway";
import { getSwaggerDescription } from "@src/swagger/helpers";
import { APIGateway, AWSError, Request } from "aws-sdk";
import { random } from "faker";

describe("getSwaggerDescription", () => {
    const getExportMock: jest.SpyInstance<
        Request<APIGateway.Types.ExportResponse, AWSError>
    > = jest.spyOn(apiGateway, "getExport");

    beforeEach(() => {
        getExportMock.mockClear();
        getExportMock.mockImplementation((_, callback) => callback(undefined, { body: random.uuid() }));
    });

    it("Should resolve data.body from apiGateway", async () => {
        const expectedBody = random.uuid();
        const data = {
            body: expectedBody
        };
        getExportMock.mockImplementationOnce((_, callback) =>
            callback(undefined, data)
        );

        const actualBody = await getSwaggerDescription(random.uuid(), random.uuid());

        expect(actualBody).toStrictEqual(expectedBody);
    });
    it("Should reject error from apiGateway", async () => {
        const expectedError = random.uuid();
        getExportMock.mockImplementationOnce((_, callback) =>
            callback(expectedError, random.uuid())
        );

        try {
            await getSwaggerDescription(random.uuid(), random.uuid());
            expect(false).toBeTruthy();
        } catch (exception) {
            expect(exception).toStrictEqual(expectedError);
        }
    });
    it("Should class apiGateway.getExport with accepts = 'application/json'", async () => {
        await getSwaggerDescription(random.uuid(), random.uuid());

        const params: APIGateway.Types.GetExportRequest = getExportMock.mock.calls[0][0];
        const actualAccepts = params.accepts;
        expect(actualAccepts).toBe("application/json");
    });
    it("Should class apiGateway.getExport with exportType = 'swagger'", async () => {
        await getSwaggerDescription(random.uuid(), random.uuid());

        const params: APIGateway.Types.GetExportRequest = getExportMock.mock.calls[0][0];
        const actualExportType = params.exportType;
        expect(actualExportType).toBe("swagger");
    });
    it("Should class apiGateway.getExport with restApiId", async () => {
        const expectedRestApiId = random.uuid();

        await getSwaggerDescription(expectedRestApiId, random.uuid());

        const params: APIGateway.Types.GetExportRequest = getExportMock.mock.calls[0][0];
        const actualRestApiId = params.restApiId;
        expect(actualRestApiId).toBe(expectedRestApiId);
    });
    it("Should class apiGateway.getExport with stageName", async () => {
        const expectedStageName = random.uuid();

        await getSwaggerDescription(random.uuid(), expectedStageName);

        const params: APIGateway.Types.GetExportRequest = getExportMock.mock.calls[0][0];
        const actualStageName = params.stageName;
        expect(actualStageName).toBe(expectedStageName);
    });
});
