// tslint:disable max-classes-per-file

export abstract class ApiException extends Error {
    public constructor(public code: string, public description: string) {
        super(description);
    }
}

export class BadRequestException extends ApiException {}

export class ConfigurationErrorException extends ApiException {}

export class ForbiddenException extends ApiException {}

export class InternalServerErrorException extends ApiException {
    public constructor(error: Error | string) {
        super(typeof error === "object" ? error.name : error, JSON.stringify(error, Object.getOwnPropertyNames(error)));
    }
}

export class NotFoundException extends ApiException {}
