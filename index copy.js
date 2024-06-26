// change to a blinking cursor
// why return [] ???

// linter
// enter yes or no
// offer csv, ask re: download

// use: process.stdout.write("\rThe answer is ... " + (sorted ? "Yes! 🎉" : "No! 😱") + "\n");
// The main difference between the two is that console.log automatically appends a newline (\n) to the end of 
// the output, which moves the cursor to the next line. In contrast, process.stdout.write does not automatically 
// append a newline, allowing for more controlled output, such as updating the same line in the console 
// (useful for animations or progress indicators).



const areTimestampsInDescendingOrder = require('./utils/core/areTimestampsInDescendingOrder');
const fetchTimestampsWithPlaywright = require('./utils/core/fetchTimestampsWithPlaywright');
const fetchTimestampsWithAPI = require('./utils/core/fetchTimestampsWithAPI');
const printFindings = require('./utils/core/printFindings');
const writeToCSV = require('./utils/core/writeToCSV');

const rl = require('./utils/helpers/readline');
const loadingAnimation = require('./utils/helpers/loadingAnimation');
const messages = require('./utils/helpers/messages');
const csvTitleDescription = require('./utils/helpers/csvTimestampDescription');
const hello = require('./utils/helpers/hello');

// Start server
const app = require('./utils/core/server');
const port = 3000;  
app.listen(port, () => {});

async function saveTimestamps() {
    let timestamps;
    const stopAnimation = loadingAnimation(messages.fetchSite);
    // fetch timestamps using Playwright
    timestamps = await fetchTimestampsWithPlaywright();

    if (timestamps.length !== 0) {
        
        await writeToCSV(timestamps, csvTitleDescription.iso); 
        stopAnimation();  
        return timestamps;
    } else {
        stopAnimation();  
        // backup plan to fetch timestamps using the HN API
        return new Promise((resolve) => {
            rl.question('messages.fetchSiteError', async function (answer) {
                answer = answer.trim().toLowerCase();
                if (['y', 'yes', ''].includes(answer)) {
                    timestamps = await fetchTimestampsWithAPI();
                    if (timestamps.length !== 0) { 
                        await writeToCSV(timestamps, csvTitleDescription.unix);  
                    }
                    resolve(timestamps);  
                } else {
                    console.log(messages.goodbyeAPI);
                    console.log(messages.exit);
                    resolve([]);  
                    rl.close();
                }
            });
        });
    }
}

async function validateNewestArticlesOrder() {
    hello();
    rl.question(messages.pressEnter, async () => {
        const timestamps = await saveTimestamps();
        if (timestamps.length === 0) {
            return;
        }
        const sorted = areTimestampsInDescendingOrder(timestamps);
        printFindings(sorted);
    });
}

(async () => {
    validateNewestArticlesOrder();
})();



