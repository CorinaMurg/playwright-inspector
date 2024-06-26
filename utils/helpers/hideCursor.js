function hideCursor() {
    process.stdout.write('\x1B[?25l');
}

module.exports = hideCursor;