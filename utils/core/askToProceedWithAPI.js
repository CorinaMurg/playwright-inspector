const handleUserInput = require('../helpers/handleUserInput');
const rl = require('../helpers/readline');
const fetchTimestampsWithAPI = require('./fetchTimestampsWithAPI');
const writeToCSV = require('./writeToCSV');
const areTimestampsInDescendingOrder = require('./areTimestampsInDescendingOrder');
const printFindings = require('./printFindings');
const messages = require('../helpers/messages');
const loadingAnimation = require('../helpers/loadingAnimation');
const csvTitleDescription = require('../helpers/csvTimestampDescription');

async function askToProceedWithAPI() {
    handleUserInput(
        rl,
        0,
        messages.fetchSiteError,
        (async () => {
            const stopAnimation = loadingAnimation(messages.fetchAPI);
            let timestamps = await fetchTimestampsWithAPI();
            stopAnimation();
            if (timestamps.length !== 0) {
                await writeToCSV(timestamps, csvTitleDescription.iso);
                const sorted = areTimestampsInDescendingOrder(timestamps);
                printFindings(sorted, 'API');
            } else {
                console.log(messages.fetchAPIError);
                console.log(messages.exit);
                rl.close();
            }
        }),
        () => {
            console.log(messages.goodbyeAPI);
            console.log(messages.exit);
            rl.close();
        }
    );
}

module.exports = askToProceedWithAPI;