import handleUserInput from '../helpers/handleUserInput.js';
import rl from '../helpers/readline.js';
import messages from '../helpers/messages.js';
import loadingAnimation from '../helpers/loadingAnimation.js';
import writeToCSV from './writeToCSV.js';
import areTimestampsInDescendingOrder from './areTimestampsInDescendingOrder.js';
import printFindings from './printFindings.js';
import csvTitleDescription from '../helpers/csvTimestampDescription.js';
import fetchTimestampsWithAPI from './fetchTimestampsWithAPI.js';

export default async function askToProceedWithAPI() {
    handleUserInput(
        rl,
        0,
        messages.fetchSiteError,
        (async () => {
            const stopAnimation = loadingAnimation(messages.fetchAPI);
            let timestamps = await fetchTimestampsWithAPI();
            stopAnimation();
            if (timestamps.length !== 0) {
                await writeToCSV(timestamps, 'API', csvTitleDescription.iso);
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