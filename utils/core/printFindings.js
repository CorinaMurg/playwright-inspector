const rl = require('../helpers/readline');
const messages = require('../helpers/messages');
const loadingAnimation = require('../helpers/loadingAnimation');
const handleUserInput = require('../helpers/handleUserInput');

async function printFindings(sorted, source) {
    console.log(messages.success);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const stopAnimation = loadingAnimation(messages.answerIs);
    await new Promise(resolve => setTimeout(() => {
        stopAnimation();  
        resolve();  
    }, 5000));
    console.log(sorted ? messages.yesDescending : messages.noDescending);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(messages.csvFile(source));

    handleUserInput(
        rl,
        0,
        messages.offerDownload,
        () => { 
            console.log(messages.csvDownload(source));
            console.log(messages.finalGoodbye);
            console.log(messages.exit);
            rl.close();
        },
        () => {
            console.log(messages.goodbye);
            console.log(messages.exit);
            rl.close();
        }
    );
}

module.exports = printFindings;
