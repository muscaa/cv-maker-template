const fs = require("fs");
const archiver = require("archiver");

const commands = require("../utils/commands");
const files = require("../utils/files");

function zip(outputPath, addContents) {
    return new Promise((resolve, reject) => {
        commands.running("ZIP");

        files.mkdirOf(outputPath);

        const stream = fs.createWriteStream(outputPath);
        stream.on("close", () => {
            commands.done("ZIP");
            resolve();
        });


        const zip = archiver("zip", { zlib: { level: 9 } });
        zip.on("warning", err => {
            if (err.code === "ENOENT") {
                console.warn(err);
            } else {
                commands.error("ZIP", err);
                reject(err);
            }
        });
        zip.on("error", err => {
            commands.error("ZIP", err);
            reject(err);
        });

        zip.pipe(stream);
        addContents(zip);
        zip.finalize();
    });
}

module.exports = {
    zip
};
