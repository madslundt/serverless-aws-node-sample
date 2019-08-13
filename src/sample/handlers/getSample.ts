import validationHandling from "@infrastructure/validationHandling";
import * as Joi from "joi";

export interface IRequest {
    a: number;
    b: number;
}
export interface IResponse extends IRequest {
    sum: number;
}

const schema: Joi.ObjectSchema = Joi.object({
    a: Joi.number().min(1).required(),
    b: Joi.number().required()
});

const handler = (request: IRequest): IResponse => {
    const value = validationHandling<IRequest>(request, schema);

    const sum = value.a + value.b;

    const result: IResponse = {
        ...request,
        sum
    };

    return result;
};

export default handler;
