var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
app.listen(port, () => { });
function validateDescendingOrder() {
    return __awaiter(this, void 0, void 0, function* () {
        const stopAnimation = loadingAnimation(messages.fetchSite);
        // fetch timestamps using Playwright
        let timestamps = yield fetchTimestampsWithPlaywright();
        if (timestamps.length === 0) {
            stopAnimation();
            // backup plan to fetch timestamps using the HN API
            yield askToProceedWithAPI();
        }
        else {
            stopAnimation();
            yield writeToCSV(timestamps, "HN", csvTitleDescription.iso);
            const sorted = areTimestampsInDescendingOrder(timestamps);
            printFindings(sorted, 'HN');
        }
    });
}
function initiateValidation() {
    return __awaiter(this, void 0, void 0, function* () {
        hello();
        rl.question(messages.pressEnter, () => __awaiter(this, void 0, void 0, function* () {
            yield validateDescendingOrder();
        }));
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield initiateValidation();
}))();
