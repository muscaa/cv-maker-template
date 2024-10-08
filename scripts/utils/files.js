const path = require("path");
const fs = require("fs");

const root = path.resolve(__dirname, "../../");

function of(filePath) {
    return path.resolve(root, filePath);
}

function mkdir(dirPath) {
    fs.mkdirSync(dirPath, { recursive: true });
}

function mkdirOf(filePath) {
    mkdir(path.parse(filePath).dir);
}

function rm(filePath) {
    fs.rmSync(filePath, { recursive: true });
}

module.exports = {
    root,
    of,
    mkdir,
    mkdirOf,
    rm
};
