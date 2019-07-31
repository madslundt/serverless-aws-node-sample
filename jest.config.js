/* tslint:disable */
const tsconfig = require("./tsconfig.json")
const moduleNameMapper = require("tsconfig-paths-jest")(tsconfig)

module.exports = {
    testEnvironment: "node",
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    testMatch: ["**/?(*.)+test.ts", "**/tests/**/*.ts"],
    testPathIgnorePatterns: ["/node_modules/"],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: -10
        }
    },
    moduleNameMapper
};
/* tslint:enable */