var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import handleUserInput from '../helpers/handleUserInput.js';
import rl from '../helpers/readline.js';
import messages from '../helpers/messages.js';
import loadingAnimation from '../helpers/loadingAnimation.js';
import writeToCSV from './writeToCSV.js';
import areTimestampsInDescendingOrder from './areTimestampsInDescendingOrder.js';
import printFindings from './printFindings.js';
import csvTitleDescription from '../helpers/csvTimestampDescription.js';
import fetchTimestampsWithAPI from './fetchTimestampsWithAPI.js';
export default function askToProceedWithAPI() {
    return __awaiter(this, void 0, void 0, function* () {
        handleUserInput(rl, 0, messages.fetchSiteError, (() => __awaiter(this, void 0, void 0, function* () {
            const stopAnimation = loadingAnimation(messages.fetchAPI);
            let timestamps = yield fetchTimestampsWithAPI();
            stopAnimation();
            if (timestamps.length !== 0) {
                yield writeToCSV(timestamps, 'API', csvTitleDescription.iso);
                const sorted = areTimestampsInDescendingOrder(timestamps);
                printFindings(sorted, 'API');
            }
            else {
                console.log(messages.fetchAPIError);
                console.log(messages.exit);
                rl.close();
            }
        })), () => {
            console.log(messages.goodbyeAPI);
            console.log(messages.exit);
            rl.close();
        });
    });
}
