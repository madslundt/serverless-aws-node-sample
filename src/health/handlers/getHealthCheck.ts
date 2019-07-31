export interface IResponse {
    success: boolean;
}

const handler = (): IResponse => {
    const result: IResponse = {
        success: true,
    };

    return result;
};

export default handler;
