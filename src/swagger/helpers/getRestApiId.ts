import apiGateway from "@shared/apiGateway";
import { APIGateway, AWSError } from "aws-sdk";

const getRestApiId = async (
    stageName: string,
    apiName: string
): Promise<string | undefined> =>
    new Promise<string | undefined>(
        (
            resolve: (result?: string) => void,
            reject: (reason: AWSError) => void
        ): void => {
            apiGateway.getRestApis(
                (
                    error: AWSError,
                    data: APIGateway.Types.RestApis
                ): void => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    const targetApiName: string = `${stageName}-${apiName}`;

                    if (data.items && data.items.length > 0) {
                        const matchingApi:
                            | APIGateway.Types.RestApi
                            | undefined = data.items.find(
                            (api: APIGateway.Types.RestApi) =>
                                api.name === targetApiName
                        );
                        resolve(matchingApi ? matchingApi.id : undefined);
                    }

                    resolve();
                }
            );
        }
    );

export default getRestApiId;
