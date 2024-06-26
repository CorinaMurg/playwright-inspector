const rl = require('./readline');
const messages = require('../helpers/messages');

function handleUserInput(rl, attemptCount = 0, prompt, onYes, onNo) {
    rl.question(prompt, (answer) => {
        answer = answer.trim().toLowerCase();
        if (!['y', 'yes', 'n', 'no', ''].includes(answer)) {
            attemptCount++;
            if (attemptCount >= 2) {
                console.log(messages.exitingIfInvalid);
                console.log(messages.exit);
                rl.close();
            } else {
                handleUserInput(rl, attemptCount, messages.invalid(answer), onYes, onNo);
            }
            return;
        }
        if (['y', 'yes', ''].includes(answer)) {
            onYes();  
        } 
        if (['n', 'no'].includes(answer)) {
            onNo();
        } 
    });
}

module.exports = handleUserInput;
