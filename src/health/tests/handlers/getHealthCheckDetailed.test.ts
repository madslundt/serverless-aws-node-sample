import { getHealthCheckDetailedHandler, IGetHealthCheckDetailedRequest } from "@src/health/handlers";
import { random } from "faker";

describe("GetHealthCheck handler", () => {
    it("Should return success = true", async () => {
        const request: IGetHealthCheckDetailedRequest = {
            requestId: random.uuid()
        };
        const result = getHealthCheckDetailedHandler(request);

        const actualSuccess = result.success;
        expect(actualSuccess).toBeTruthy();
    });

    it("Should return correct requestId", async () => {
        const expectedRequestId = random.uuid();
        const request: IGetHealthCheckDetailedRequest = {
            requestId: expectedRequestId
        };

        const result = getHealthCheckDetailedHandler(request);

        const actualRequestId = result.requestId;
        expect(actualRequestId).toBe(expectedRequestId);
    });
});
