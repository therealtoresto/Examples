const jwt = require('jsonwebtoken');

const payload = { id: 1, username: 'Terens', role: 'admin' };
const secret = 'This is very secret string for jwt';

const token = jwt.sign(payload, secret);

console.log('JWT', {token});

const decode = jwt.decode(token);

console.log('Decoded:', decode);

try {
    const secret2 = 'This is secret string for jwt'
    const verify = jwt.verify(token, secret);
    console.log('Secret1:', verify); // Decoded token

    const verify2 = jwt.verify(token, secret2);
    console.log('Secret2:', verify2); // Invalid signature
} catch (err) {
    console.log(err.message);
}
