import hideCursor from './hideCursor.js';
import showCursor from './showCursor.js';

export default function loadingAnimation(message: string) {
    hideCursor();
    const symbols = ['|', '/', '-', '\\'];
    let index = 0;

    const interval = setInterval(() => {
        process.stdout.write(`\r${symbols[index++ % symbols.length]} ${message}`);
    }, 100);

    return function stopLoadingAnimation() {
        clearInterval(interval);
        process.stdout.write('\r'.padEnd(60, ' '));  
        process.stdout.write('\r');  
        showCursor();
    };
}
