var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { chromium } from 'playwright';
export default function fetchTimestampsWithPlaywright() {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield chromium.launch();
        const page = yield browser.newPage();
        try {
            yield page.goto("https://news.ycombinator.com/newest/");
            let timeStamps = [];
            for (let i = 0; i < 4; i++) {
                if (i > 0) {
                    yield page.click('a.morelink');
                    yield page.waitForLoadState('load');
                }
                const currentPageTimeStamps = yield querySelectTimestamps(page, i === 3 ? 10 : 30);
                timeStamps = timeStamps.concat(currentPageTimeStamps);
            }
            return timeStamps;
        }
        catch (error) {
            console.error(error);
            return [];
        }
        finally {
            yield browser.close();
        }
    });
}
function querySelectTimestamps(page, numberOfArticles) {
    return __awaiter(this, void 0, void 0, function* () {
        return page.evaluate((numberOfArticles) => {
            const timeStampElements = Array.from(document.querySelectorAll('span.age'));
            return timeStampElements.slice(0, numberOfArticles).map(el => el.getAttribute('title') || '');
        }, numberOfArticles);
    });
}
