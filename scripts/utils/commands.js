function running(command) {
    console.info(`${command}: Running...`);
}

function done(command) {
    console.info(`${command}: Done!`);
}

function error(command, error) {
    console.info(`${command}: Error!`);
}

module.exports = {
    running,
    done,
    error
};
