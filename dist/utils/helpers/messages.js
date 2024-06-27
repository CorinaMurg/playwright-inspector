import date from './date.js';
import folderName from '../core/folderName.js';
const messages = {
    hello: 'Hello, I\'m Corina. 👋',
    checkHN: 'Let\'s check the order of the latest 100 articles on Hacker News.',
    pressEnter: 'Ready? Press Enter to continue ... ',
    fetchSite: 'Fetching article timestamps from Hacker News ...',
    fetchSiteError: 'The site is not available right now.😞  Should we try an API call? (y/n): ',
    goodbyeAPI: 'Well, goodbye for now. Please try again later. 👋',
    fetchAPI: 'Fetching timestamps via the Hacker News API ...',
    fetchAPIError: 'Bummer ... the API call has failed as well. Let\'s retry later.',
    success: `\rSuccess! We have the data. Are the articles sorted from newest to oldest?`,
    answerIs: 'The answer is ... 🥁 roll please ... ',
    yesDescending: 'Yes! 🎉 🎉 🎉',
    noDescending: 'No! 😱 😱 😱',
    csvFile: source => `Check the timestamp data in ➡️  src/${folderName}/${source}_${date}.csv`,
    offerDownload: 'Interested in downloading the file? (y/n): ',
    goodbye: 'Auf Wiedersehen, goodbye then. Have a great day! 🌞',
    csvDownload: source => `Download the file at ➡️  http://localhost:3000/files/${source}_${date}.csv`,
    finalGoodbye: 'Have a great day! 🌞',
    invalid: answer => `What is this "${answer}" of yours? 🤔  You must type "y" or "n": `,
    exitingIfInvalid: 'Still no "y" or "n"... Take a ☕ break, and try again later.',
    exit: 'Press Ctrl + C to exit.',
};
export default messages;
