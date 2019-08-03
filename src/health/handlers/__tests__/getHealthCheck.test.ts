import { getHealthCheckHandler } from "@src/health/handlers";

describe("GetHealthCheck handler", () => {
    it("Should return success = true", async () => {
        const result = getHealthCheckHandler();

        const actualSuccess = result.success;
        expect(actualSuccess).toBeTruthy();
    });
});
