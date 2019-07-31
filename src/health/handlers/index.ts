import getHealthCheckHandler, {
    IResponse as IGetHealthCheckResponse
} from "./getHealthCheck";

import getHealthCheckDetailedHandler, {
    IRequest as IGetHealthCheckDetailedRequest,
    IResponse as IGetHealthCheckDetailedResponse
} from "./getHealthCheckDetailed";

export {
    getHealthCheckHandler,
    IGetHealthCheckResponse,
    getHealthCheckDetailedHandler,
    IGetHealthCheckDetailedRequest,
    IGetHealthCheckDetailedResponse
};
