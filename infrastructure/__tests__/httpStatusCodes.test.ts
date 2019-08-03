import { HttpStatusCode } from "@infrastructure/httpStatusCodes";

describe("HttpStatusCodes", () => {
    it("BadRequest should have status code 400", () => {
        expect(HttpStatusCode.BadRequest).toBe(400);
    });
    it("ConfigurationError should have status code 500.19", () => {
        expect(HttpStatusCode.ConfigurationError).toBe(500.19);
    });
    it("Forbidden should have status code 403", () => {
        expect(HttpStatusCode.Forbidden).toBe(403);
    });
    it("InternalServerError should have status code 500", () => {
        expect(HttpStatusCode.InternalServerError).toBe(500);
    });
    it("NotFound should have status code 404", () => {
        expect(HttpStatusCode.NotFound).toBe(404);
    });
    it("Ok should have status code 200", () => {
        expect(HttpStatusCode.Ok).toBe(200);
    });
});