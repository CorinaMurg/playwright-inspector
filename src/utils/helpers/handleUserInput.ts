import { ReadLine } from 'node:readline';
import rl from './readline.js';
import messages from './messages.js';

type Callback = () => void;

export default function handleUserInput(
    rl: ReadLine, 
    attemptCount: number = 0, 
    prompt: string, 
    onYes: Callback, 
    onNo: Callback
) {
    rl.question(prompt, (answer: string) => {
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

