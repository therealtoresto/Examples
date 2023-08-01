const {isUserAlreadyRegistered} = require('./router.js');
const mockingoose = require('mockingoose');
const User = require('../schemas/user.js');


describe('Registration route test', () => {
    test('Should be register successfully', async () => {
        const doc = {
            username: 'ivan_123',
            email: 'ivan_123@gmail.com',
            password: '12345'
        }

        mockingoose(User).toReturn(null, 'findOne');

        const res = await isUserAlreadyRegistered(doc.email);
        expect(res).toBe(false);
    })
})