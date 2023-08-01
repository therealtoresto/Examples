const assert = require('node:assert');

/** 
 * Convert IP to number
 * @argument {string} ip
 * @returns {number}
 * @example '127.0.0.1' -> 1223344
 */
const ipToInt = (ip) => {
    if (typeof(ip) !== 'string') throw Error('String expected');
    if (ip === '') throw Error('Empty is not allowed');
    const parts = ip.split('.');
    if (parts.length !== 4) throw Error('Wrong IPv4 format');
    const nums = parts.map((num) => parseInt(num, 10));
    if (nums.includes(NaN)) throw Error('Wrong IPv4 format');
    return nums.reduce((res, item) => (res << 8) + item)
};

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
    assert.strictEqual(number, 2130706433, 'Localhost ip address fail');
    console.log('Test done!');
}

const testPrivate = () => {
    const number = ipToInt('10.0.0.1');
    assert.strictEqual(number, 167772161, 'Private network ip address fail');
    console.log('Test done!');
}

const testNumber = () => {
    const number = ipToInt(21212);
    assert.strictEqual(number, 167772161, 'Number fail');
    console.log('Test done!');
}

const testEmptySring = () => {
    const number = ipToInt('');
    assert.strictEqual(number, 0, 'Empty string as ip address fail');
    console.log('Test done!');
}

const testWrongString = () => {
    const number = ipToInt('wrong string');
    assert.strictEqual(number, Number.NaN, 'Wrong string ip address fail');
    console.log('Test done!');
}

const tests = [
    testLocalhost,
    testPrivate,
    testNumber,
    testEmptySring,
    testWrongString
];

for (const test of tests) {
    try {
        test()
    } catch (err) {
        console.log(err);
    }
}
