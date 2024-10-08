const callWebpack = require("webpack");
const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const commands = require("../utils/commands");
const files = require("../utils/files");

const webpackConfig = {
    mode: "production",
    entry: {
        main: "./src/template/main.ts",
    },
    output: {
        path: null,
        filename: null,
    },
    resolve: {
        extensions: [ ".ts", ".js" ],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: "./tsconfig.json"
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
};

function webpack(outputPath = null) {
    return new Promise((resolve, reject) => {
        commands.running("WEBPACK");

        if (outputPath) {
            const output = path.parse(outputPath);
            webpackConfig.output.path = files.of(output.dir);
            webpackConfig.output.filename = output.base;
        }

        callWebpack(webpackConfig, (err, stats) => {
            if (err) {
                commands.error("WEBPACK", err);
                reject(err);
            } else if (stats.hasErrors()) {
                const err = new Error(JSON.stringify(stats.toJson().errors));
                commands.error("WEBPACK", err);
                reject(err);
            } else {
                commands.done("WEBPACK");
                resolve();
            }
        });
    });
}

module.exports = {
    webpack,
    webpackConfig
};
