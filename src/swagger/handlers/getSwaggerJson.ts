import {
    ForbiddenException,
    NotFoundException
} from "@infrastructure/errors";

import {
    getRestApiId,
    getSwaggerDescription,
} from "../helpers";
import parseJson from "@shared/helpers/parseJson";

export interface IRequest {
    API_INFO_TITLE: string;
    API_INFO_VERSION: string;
    REST_API_NAME: string;
    STAGE_NAME: string;
}

export interface IResponse {
    info: {
        title: string;
        version: string;
    };
    paths: {
        [x: string]: {
            options?: {
                [x: string]: any; // tslint:disable-line no-any (We don't have exact information about the structure of the Swagger document.)
            };
            [x: string]: any; // tslint:disable-line no-any (We don't have exact information about the structure of the Swagger document.)
        };
    };
    [x: string]: any; // tslint:disable-line no-any (We don't have exact information about the structure of the Swagger document.)
}

const handler = async (): Promise<IResponse> => {
    const request: any = {
        ...process.env
    };

    const restApiName: string = request.REST_API_NAME;
    const stageName: string = request.STAGE_NAME;
    const apiInfoTitle: string = request.API_INFO_TITLE;
    const apiInfoVersion: string = request.API_INFO_VERSION;

    try {
        const restApiId = await getRestApiId(stageName, restApiName);
        if (!restApiId) {
            throw new NotFoundException(
                "Invalid name",
                "Cannot find the API with the specified name!"
            );
        }

        const jsonDescription = await getSwaggerDescription(
            restApiId,
            stageName
        );

        const result: IResponse = parseJson(jsonDescription) as IResponse;

        // Remove the /swagger.json path from the documentation.
        delete result.paths["/swagger.json"];

        // Remove the OPTIONS endpoints generated automatically because CORS is enabled.
        for (const pathName in result.paths) {
            if (result.paths[pathName].options) {
                delete result.paths[pathName].options;
            }
        }

        // Update the 'info' properties in the header, because the API Gateway exports raw values instead of what is specified in the documentation.
        // This is a known issue with 'serverless-aws-documentation', read more in its README.
        result.info.title = apiInfoTitle;
        result.info.version = apiInfoVersion;

        return result;
    } catch (exception) {
        if (exception.code === "AccessDeniedException") {
            throw new ForbiddenException(
                "Missing permissions",
                exception.message
            );
        }

        throw exception;
    }
};

export default handler;
