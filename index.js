// linkedIn
// read artciles + video

// typescript
// eslint
// json2csv
// import
// webforeveryone: testing articles


const areTimestampsInDescendingOrder = require('./utils/core/areTimestampsInDescendingOrder');
const fetchTimestampsWithPlaywright = require('./utils/core/fetchTimestampsWithPlaywright');
const askToProceedWithAPI = require('./utils/core/askToProceedWithAPI');
const printFindings = require('./utils/core/printFindings');
const writeToCSV = require('./utils/core/writeToCSV');

const rl = require('./utils/helpers/readline');
const loadingAnimation = require('./utils/helpers/loadingAnimation');
const messages = require('./utils/helpers/messages');
const csvTitleDescription = require('./utils/helpers/csvTimestampDescription');
const hello = require('./utils/helpers/hello');


// Start server for timestamp data download
const app = require('./utils/core/server');
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
        await writeToCSV(timestamps, csvTitleDescription.iso);
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
