import { APIGatewayEvent, APIGatewayProxyCallback, Context, ProxyResult } from "aws-lambda";
import { ApiException } from "./errors";

export type ApiCallback = APIGatewayProxyCallback;
export type ApiContext = Context;
export type ApiEvent = APIGatewayEvent;
export type ApiHandler = (event: APIGatewayEvent, context: Context, callback: ApiCallback) => void; // Same as ProxyHandler, but requires callback.
export type ApiResponse = ProxyResult;

export interface IErrorResponseBody {
    error: ApiException;
}
