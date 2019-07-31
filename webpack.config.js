var path = require("path");
const slsw = require("serverless-webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const entries = {};
Object.keys(slsw.lib.entries).forEach(
    key => (entries[key] = ["./source-map-install.js", slsw.lib.entries[key]])
);

module.exports = {
    entry: entries,
    externals: ["aws-sdk"],
    target: "node",
    mode: "production",
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ],
            }
        ]
    },
    resolve: {
        plugins: [
            new TsconfigPathsPlugin()
        ],
        extensions: [
            ".js",
            ".json",
            ".ts",
            ".tsx"
        ]
    },
    output: {
        libraryTarget: "commonjs",
        path: path.join(__dirname, ".build"),
        filename: "[name].js"
    }
};
