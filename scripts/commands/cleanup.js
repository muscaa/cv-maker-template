const fs = require("fs");

const commands = require("../utils/commands");
const files = require("../utils/files");

function cleanup(dir, exclude = []) {
    commands.running("CLEANUP");

    for (const file of fs.readdirSync(dir)) {
        if (exclude.includes(file)) continue;

        files.rm(`out/${file}`);
    }

    commands.done("CLEANUP");
}

module.exports = {
    cleanup
};
