import apiGateway from "@shared/apiGateway";
import { APIGateway, AWSError } from "aws-sdk";

const getSwaggerDescription = async (
    restApiId: string,
    stageName: string
): Promise<string> =>
    new Promise<string>(
        (
            resolve: (result: string) => void,
            reject: (reason: AWSError) => void
        ): void => {
            const params: APIGateway.Types.GetExportRequest = {
                accepts: "application/json",
                exportType: "swagger",
                restApiId,
                stageName
            };

            apiGateway.getExport(
                params,
                (error: AWSError, data: APIGateway.ExportResponse): void => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data.body as string);
                    }
                }
            );
        }
    );

export default getSwaggerDescription;
