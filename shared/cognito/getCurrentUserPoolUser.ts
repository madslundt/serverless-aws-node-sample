import { ApiEvent } from "@infrastructure/api.interfaces";

export interface IGetCurrentUserPoolUserResponse {
    userPoolId: string;
    userPoolUserId: string;
}

const getCurrentUserPoolUser = (event: ApiEvent): IGetCurrentUserPoolUserResponse | null => {
    if (!event ||
        !event.requestContext ||
        !event.requestContext.identity ||
        !event.requestContext.identity.cognitoAuthenticationProvider) {
        return null;
    }

    const authProvider = event.requestContext.identity.cognitoAuthenticationProvider;
    // Cognito authentication provider looks like:
    // tslint:disable-next-line: max-line-length
    // cognito-idp.<region>.amazonaws.com/<region>_xxxxxxxxx,cognito-idp.<region>.amazonaws.com/<region>_aaaaaaaaa:CognitoSignIn:qqqqqqqq-1111-2222-3333-rrrrrrrrrrrr
    // Where <region>_aaaaaaaaa is the User Pool id
    // And qqqqqqqq-1111-2222-3333-rrrrrrrrrrrr is the User Pool User Id

    const parts = authProvider.split(":");
    const userPoolIdParts = parts[parts.length - 3].split("/");

    const userPoolId = userPoolIdParts[userPoolIdParts.length - 1].trim();
    const userPoolUserId = parts[parts.length - 1].trim();

    const result: IGetCurrentUserPoolUserResponse = {
        userPoolId,
        userPoolUserId
    };

    return result;
};

export default getCurrentUserPoolUser;
