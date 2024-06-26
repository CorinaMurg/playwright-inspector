const hideCursor = require('./hideCursor');
const showCursor = require('./showCursor');

function loadingAnimation(message) {
    hideCursor();
    const symbols = ['|', '/', '-', '\\'];
    let index = 0;

    const interval = setInterval(() => {
        process.stdout.write(`\r${symbols[index++ % symbols.length]} ${message}`);
    }, 100);

    return function stopLoadingAnimation() {
        clearInterval(interval);
        process.stdout.write('\r'.padEnd(40, ' '));  
        process.stdout.write('\r');  
        showCursor();
    };
}

module.exports = loadingAnimation;