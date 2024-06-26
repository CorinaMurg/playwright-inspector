const messages = require('./messages');

function hello() {
    console.log(messages.hello);
    console.log(messages.checkHN);
}

module.exports = hello;