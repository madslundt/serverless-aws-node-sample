/* tslint:disable */
const tsconfig = require("./tsconfig.json");
const moduleNameMapper = require("tsconfig-paths-jest")(tsconfig);

module.exports = {
    testEnvironment: "node",
    moduleNameMapper: {
        ...moduleNameMapper,
        "aws-sdk": "<rootDir>/__mocks__/aws-sdk.mock.ts",
        "aws-xray-sdk": "<rootDir>/__mocks__/aws-xray-sdk.mock.ts",
        "dynamoose": "<rootDir>/__mocks__/dynamoose.mock.ts"
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    testMatch: ["**/?(*.)+test.ts", "**/__tests__/*.ts"],
    modulePathIgnorePatterns: ["awsxray.ts", "dynamoDb.ts"],
    testPathIgnorePatterns: ["/node_modules/"],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: -10
        }
    }
};
/* tslint:enable */
