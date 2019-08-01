/* tslint:disable */
const webpack = require("webpack");
const path = require("path");
const slsw = require("serverless-webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const nodeExternals = require("webpack-node-externals")

module.exports = (async () => {
    // const accountId = await slsw.lib.serverless.providers.aws.getAccountId();

    return {
        entry: slsw.lib.entries,
        externals: ["aws-sdk", nodeExternals()],
        node: {
            __dirname: true
        },
        devtool: "source-map",
        target: "node",
        mode: slsw.lib.webpack.isLocal ? "development" : "production",
        // plugins: [
        //     new webpack.DefinePlugin({
        //         AWS_ACCOUNT_ID: `${accountId}`
        //     })
        // ],
        module: {
            rules: [
                {
                    test: /\.ts(x?)$/,
                    use: [
                        {
                            loader: "ts-loader"
                        }
                    ]
                }
            ]
        },
        resolve: {
            plugins: [new TsconfigPathsPlugin()],
            extensions: [".js", ".json", ".ts", ".tsx"]
        },
        output: {
            libraryTarget: "commonjs",
            path: path.resolve(__dirname, ".build"),
            filename: "[name].js",
            sourceMapFilename: "[file].map"
        }
    };
})();
/* tslint:enable */
