var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import rl from '../helpers/readline.js';
import messages from '../helpers/messages.js';
import loadingAnimation from '../helpers/loadingAnimation.js';
import handleUserInput from '../helpers/handleUserInput.js';
export default function printFindings(sorted, source) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(messages.success);
        yield new Promise(resolve => setTimeout(resolve, 2000));
        const stopAnimation = loadingAnimation(messages.answerIs);
        yield new Promise(resolve => setTimeout(() => {
            stopAnimation();
            resolve();
        }, 5000));
        console.log(sorted ? messages.yesDescending : messages.noDescending);
        yield new Promise(resolve => setTimeout(resolve, 2000));
        console.log(messages.csvFile(source));
        handleUserInput(rl, 0, messages.offerDownload, () => {
            console.log(messages.csvDownload(source));
            console.log(messages.finalGoodbye);
            console.log(messages.exit);
            rl.close();
        }, () => {
            console.log(messages.goodbye);
            console.log(messages.exit);
            rl.close();
        });
    });
}
