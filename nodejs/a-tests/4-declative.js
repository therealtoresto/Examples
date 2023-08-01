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

const tests = [
    ['127.0.0.1',    2130706433, 'Localhost ip addres fail'       ],
    ['10.0.0.1',      167772161, 'Private network ip addres fail' ],
    [21212,                null, 'Number fail'                    ],
    ['',                   null, 'Empty string as ip address fail'],
    ['wrong string',       null, 'Wrong string ip address fail'   ]
];

for (const test of tests) {
    const [par, expected, name] = test;
    const result = ipToInt(par);
    try {
        assert.strictEqual(result, expected, `Error in test "${name}"`);
    } catch (err) {
        console.log(err);
    }
}