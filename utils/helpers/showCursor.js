function showCursor() {
    process.stdout.write('\x1B[?25h');
}

module.exports = showCursor;