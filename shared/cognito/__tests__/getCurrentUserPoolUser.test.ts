import { ApiEvent } from "@infrastructure/api.interfaces";
import { getCurrentUserPoolUser } from "@shared/cognito";
import { random } from "faker";

describe("getCurrentUserPoolUser", () => {
    it("Should return userPoolId", () => {
        const expectedUserPoolId = `<region>_${random.uuid()}`;
        const cognitoAuthenticationProvider = `cognito-idp.<region>.amazonaws.com/
        <region>_xxxxxxxxx,cognito-idp.
        <region>.amazonaws.com/
        ${expectedUserPoolId}:CognitoSignIn:qqqqqqqq-1111-2222-3333-rrrrrrrrrrrr`;
        const event = {
            requestContext: {
                identity: {
                    cognitoAuthenticationProvider
                }
            }
        } as ApiEvent;

        const userPoolUser = getCurrentUserPoolUser(event);

        const actualUserPoolId = userPoolUser && userPoolUser.userPoolId;
        expect(actualUserPoolId).toBe(expectedUserPoolId);
    });

    it("Should return userPoolUserId", () => {
        const expectedUserPoolUserId = random.uuid();
        const cognitoAuthenticationProvider = `cognito-idp.<region>.amazonaws.com/
        <region>_xxxxxxxxx,cognito-idp.
        <region>.amazonaws.com/
        <region>${expectedUserPoolUserId}:CognitoSignIn:${expectedUserPoolUserId}`;
        const event = {
            requestContext: {
                identity: {
                    cognitoAuthenticationProvider
                }
            }
        } as ApiEvent;

        const userPoolUser = getCurrentUserPoolUser(event);

        const actualUserPoolUserId = userPoolUser && userPoolUser.userPoolUserId;
        expect(actualUserPoolUserId).toBe(expectedUserPoolUserId);
    });

    it("Should return empty result when event is undefined", () => {
        const event = undefined as unknown as ApiEvent;

        const userPoolUser = getCurrentUserPoolUser(event);

        expect(userPoolUser).toBeNull();
    });
    it("Should return empty result when event.requestContext is undefined", () => {
        const event = {} as ApiEvent;

        const userPoolUser = getCurrentUserPoolUser(event);

        expect(userPoolUser).toBeNull();
    });
    it("Should return empty result when event.requestContext.identity is undefined", () => {
        const event = {
            requestContext: {}
        } as ApiEvent;

        const userPoolUser = getCurrentUserPoolUser(event);

        expect(userPoolUser).toBeNull();
    });
    it("Should return empty result when event.requestContext.identity.cognitoAuthenticationProvider is undefined", () => {
        const event = {
            requestContext: {
                identity: {}
            }
        } as ApiEvent;

        const userPoolUser = getCurrentUserPoolUser(event);

        expect(userPoolUser).toBeNull();
    });
});
