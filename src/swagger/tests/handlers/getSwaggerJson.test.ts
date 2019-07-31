import {
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException
} from "@shared/errors";
import { getSwaggerJsonHandler } from "@src/swagger/handlers";
import * as helpers from "@src/swagger/helpers";
import { random } from "faker";

describe("getSwaggerJson", () => {
    const getRestApiIdMock: jest.SpyInstance<Promise<string | undefined>> = jest
        .spyOn(helpers, "getRestApiId")
        .mockResolvedValue(random.uuid());

    const getSwaggerDescriptionMock: jest.SpyInstance<Promise<string>> = jest
        .spyOn(helpers, "getSwaggerDescription")
        .mockResolvedValue(JSON.stringify({ paths: [], info: { id: random.uuid() } }));

    afterEach(() => {
        getRestApiIdMock.mockClear();
        getSwaggerDescriptionMock.mockClear();
    });

    it("Should call getRestApiId once", async () => {
        await getSwaggerJsonHandler();

        expect(getRestApiIdMock).toHaveBeenCalledTimes(1);
    });
    it("Should throw NotFoundException when getRestApiId returns empty string", async () => {
        getRestApiIdMock.mockResolvedValueOnce("");

        try {
            await getSwaggerJsonHandler();
        } catch (exception) {
            expect(exception).toStrictEqual(
                new NotFoundException(
                    "Invalid name",
                    "Cannot find the API with the specified name!"
                )
            );
        }
    });
    it("Should throw NotFoundException when getRestApiId returns undefined", async () => {
        getRestApiIdMock.mockResolvedValueOnce(undefined);

        try {
            await getSwaggerJsonHandler();
        } catch (exception) {
            expect(exception).toStrictEqual(
                new NotFoundException(
                    "Invalid name",
                    "Cannot find the API with the specified name!"
                )
            );
        }
    });

    it("Should rethrow exception when getRestApiId throws an exception", async () => {
        getRestApiIdMock.mockRejectedValueOnce(new InternalServerErrorException(random.uuid()));

        try {
            await getSwaggerJsonHandler();
        } catch (exception) {
            expect(exception instanceof InternalServerErrorException).toBeTruthy();
        }
    });
    it("Should throw ForbiddenException when getRestApiId throws an exception where code = 'AccessDeniedException'", async () => {
        getRestApiIdMock.mockRejectedValueOnce(
            new InternalServerErrorException("AccessDeniedException")
        );

        try {
            await getSwaggerJsonHandler();
        } catch (exception) {
            expect(exception).toStrictEqual(
                new ForbiddenException("Missing permissions", exception.message)
            );
        }
    });
    it("Should call getRestApiId with process.env.STAGE_NAME", async () => {
        const expectedStageName = random.uuid();
        process.env.STAGE_NAME = expectedStageName;

        await getSwaggerJsonHandler();

        const actualStageName = getRestApiIdMock.mock.calls[0][0];
        expect(actualStageName).toBe(expectedStageName);
    });
    it("Should set info.title from process.env.REST_API_NAME", async () => {
        const expectedRestApiName = random.uuid();
        process.env.REST_API_NAME = expectedRestApiName;

        await getSwaggerJsonHandler();

        const actualRestApiName = getRestApiIdMock.mock.calls[0][1];
        expect(actualRestApiName).toBe(expectedRestApiName);
    });
    it("Should set info.version from process.env.API_INFO_VERSION", async () => {
        const expectedVersion = random.uuid();
        process.env.API_INFO_VERSION = expectedVersion;

        const result = await getSwaggerJsonHandler();

        const actualVersion = result.info.version;
        expect(actualVersion).toBe(expectedVersion);
    });
    it("Should set info.title from process.env.API_INFO_TITLE", async () => {
        const expectedTitle = random.uuid();
        process.env.API_INFO_TITLE = expectedTitle;

        const result = await getSwaggerJsonHandler();

        const actualTitle = result.info.title;
        expect(actualTitle).toBe(expectedTitle);
    });
    it("Should delete '/swagger.json' from paths", async () => {
        getSwaggerDescriptionMock.mockResolvedValueOnce(JSON.stringify({
            info: {},
            paths: {
                "/swagger.json": random.uuid()
            }
        }));

        const result = await getSwaggerJsonHandler();

        const actualPaths = Object.keys(result.paths);
        expect(actualPaths).toHaveLength(0);
    });
    it("Should ONLY delete '/swagger.json' from paths", async () => {
        getSwaggerDescriptionMock.mockResolvedValueOnce(JSON.stringify({
            info: {},
            paths: {
                "/swagger.json": random.uuid(),
                [random.uuid()]: random.uuid()
            }
        }));

        const result = await getSwaggerJsonHandler();

        const actualPaths = Object.keys(result.paths);
        expect(actualPaths).toHaveLength(1);
    });
    it("Should delete options in path", async () => {
        getSwaggerDescriptionMock.mockResolvedValueOnce(JSON.stringify({
            info: {},
            paths: {
                0: {
                    options: random.uuid()
                }
            }
        }));

        const result = await getSwaggerJsonHandler();

        const actualOption = result.paths[0].options;
        expect(actualOption).toBeUndefined();
    });
});
