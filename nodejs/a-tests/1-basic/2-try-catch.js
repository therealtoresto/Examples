const assert = require('node:assert');

/** 
 * Convert IP to number
 * @argument {string} ip
 * @returns {number}
 * @example '127.0.0.1' -> 1223344
 */
const ipToInt = (ip) => ip.split('.')
    .reduce((res, item) => (res << 8) + +item, 0);


// Test

const testLocalhost = () => {
    const number = ipToInt('127.0.0.1');
    // ['127', '0', '0', '1']
    // 0 << 8 = 0
    // 0 + 127 = 127
    // 127 << 8 = 32512
    // 32512 << 8 = 8323072
    // 8323072 << 8 = 2130706432
    // 2130706432 + 1 = 2130706433
    assert.strictEqual(number, 2130706433, 'Localhost ip addres fail');
    console.log('Test done!');
}

const testPrivate = () => {
    const number = ipToInt('10.0.0.1');
    assert.strictEqual(number, 167772161, 'Private network ip addres fail');
    console.log('Test done!');
}

const testSmth = () => {
    const number = ipToInt(21212);
    assert.strictEqual(number, 167772161, 'Private network ip addres fail');
    console.log('Test done!');
}

const tests = [
    testLocalhost,
    testPrivate,
    testSmth
];

for (const test of tests) {
    try {
        test();
    } catch (err) {
        console.log(err);
    }
}
