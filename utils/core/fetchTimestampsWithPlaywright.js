import { chromium } from 'playwright';

export default async function fetchTimestampsWithPlaywright() {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    try {
        await page.goto("https://news.ycombinator.com/newest");

        let timeStamps = [];
        for (let i = 0; i < 4; i++) {
            if (i > 0) { 
                await page.click('a.morelink');
                await page.waitForLoadState('load');
            }
            const thisPageTimeStamps = await querySelectTimestamps(page, i === 3 ? 10 : 30); 
            timeStamps = timeStamps.concat(thisPageTimeStamps);
        }
        return timeStamps;
    }   catch (error) {
            console.error(error);
            return [];
    }   finally {
            await browser.close();
    }
}

async function querySelectTimestamps (page, numberOfArticles) {
    return page.evaluate((numberOfArticles) => {
        const timeStampElements = Array.from(document.querySelectorAll('span.age'));
        return timeStampElements.slice(0, numberOfArticles).map(el => el.getAttribute('title'));
    }, numberOfArticles);
}