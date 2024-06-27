import { chromium } from 'playwright';
import { Page } from 'playwright';


export default async function fetchTimestampsWithPlaywright() {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    try {
        await page.goto("https://news.ycombinator.com/newest/");

        let timestamps: string[] = [];
        for (let i = 0; i < 4; i++) {
            if (i > 0) { 
                await page.click('a.morelink');
                await page.waitForLoadState('load');
            }
            const currentPageTimeStamps = await querySelectTimestamps(page, i === 3 ? 10 : 30); 
            timestamps = timestamps.concat(currentPageTimeStamps);
        }
        return timestamps;
    }   catch (error) {
            console.error(error);
            return [];
    }   finally {
            await browser.close();
    }
}

async function querySelectTimestamps (page: Page, numberOfArticles: number): Promise<string[]>{
    return page.evaluate((numberOfArticles: number) => {
        const timestampElements = Array.from(document.querySelectorAll('span.age'));
        return timestampElements.slice(0, numberOfArticles).map(el => el.getAttribute('title') || '');
    }, numberOfArticles);
}