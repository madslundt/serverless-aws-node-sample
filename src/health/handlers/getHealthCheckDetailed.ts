export interface IRequest {
    requestId: string;
}

export interface IResponse {
    requestId: string;
    environment?: string;
    success: boolean;
}

const handler = (request: IRequest): IResponse => {
    const result: IResponse = {
        requestId: request.requestId,
        environment: process.env.stage,
        success: true,
    };

    return result;
};

export default handler;
