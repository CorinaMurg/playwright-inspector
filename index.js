// linkedIn
// read artciles + video

// typescript

// webforeveryone: testing articles


import rl from './utils/helpers/readline.js';
import messages from './utils/helpers/messages.js';
import loadingAnimation from './utils/helpers/loadingAnimation.js';
import writeToCSV from './utils/core/writeToCSV.js';
import areTimestampsInDescendingOrder from './utils/core/areTimestampsInDescendingOrder.js';
import printFindings from './utils/core/printFindings.js';
import csvTitleDescription from './utils/helpers/csvTimestampDescription.js';
import fetchTimestampsWithPlaywright from './utils/core/fetchTimestampsWithPlaywright.js';
import askToProceedWithAPI from './utils/core/askToProceedWithAPI.js';
import hello from './utils/helpers/hello.js';


// Start server for timestamp data download
import app from './utils/core/server.js';
const port = 3000;  
app.listen(port, () => {});

async function validateDescendingOrder() {
    const stopAnimation = loadingAnimation(messages.fetchSite);
    // fetch timestamps using Playwright
    let timestamps = await fetchTimestampsWithPlaywright();

    if (timestamps.length === 0) {
        stopAnimation();
        // backup plan to fetch timestamps using the HN API
        await askToProceedWithAPI();
    } else {
        stopAnimation();
        await writeToCSV(timestamps, "HN", csvTitleDescription.iso);
        const sorted = areTimestampsInDescendingOrder(timestamps);
        printFindings(sorted, 'HN');
    }
}

async function initiateValidation() {
    hello();
    rl.question(messages.pressEnter, async () => {
        await validateDescendingOrder();
    });
}

(async () => {
    await initiateValidation();
})();
