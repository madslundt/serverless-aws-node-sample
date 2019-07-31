export interface IRequest {
    a: number;
    b: number;
}
export interface IResponse extends IRequest {
    sum: number;
}

const handler = (request: IRequest): IResponse => {
    const sum = request.a + request.b;

    const result: IResponse = {
        ...request,
        sum
    };

    return result;
};

export default handler;
