export interface IRequest {
    requestId: string;
}

export interface IResponse {
    requestId: string;
    success: boolean;
}

const handler = (request: IRequest): IResponse => {
    const result: IResponse = {
        requestId: request.requestId,
        success: true,
    };

    return result;
};

export default handler;
