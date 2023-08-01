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

{
    const number = ipToInt('127.0.0.1');
    // ['127', '0', '0', '1']
    // 0 << 8 = 0
    // 0 + 127 = 127
    // 127 << 8 = 32512
    // 32512 << 8 = 8323072
    // 8323072 << 8 = 2130706432
    // 2130706432 + 1 = 2130706433
    assert.strictEqual(number, 213070643, 'Localhost ip addres failed');
    console.log('Test done!');
}