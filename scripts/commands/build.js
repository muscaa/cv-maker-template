const commands = require('../utils/commands');
const { webpack } = require('./webpack');
const { zip } = require('./zip');
const { cleanup } = require('./cleanup');

async function build() {
    commands.running("BUILD");

    await webpack("out/bundle.js");

    await zip("out/template.zip", zip => {
        zip.file("out/bundle.js", { name: "template.js" });
        zip.directory("resources", false);
    });

    cleanup("out", [ "template.zip" ]);

    commands.done("BUILD");
}

module.exports = {
    build
};
