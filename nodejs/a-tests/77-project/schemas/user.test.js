const mongoose = require('mongoose');
const User = require('./user.js');

const user = {
    email: 'test@test.com',
    password: '12345678',
    username: 'test_user',
    role: 'guest'
}

describe('Testing User model', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/goit', {
            useNewUrlRarser: true,
            useUnifiedTopology: true
        });
    });

    afterAll(async () => {
        // await User.findOneAndDelete({ username: 'test_user' });
        await mongoose.connection.close();
    });

    it('Should create user and save it in db', async () => {
        const testUser = new User(user);
        const savedUser = await testUser.save();

        expect(savedUser._id).toBeDefined();
        expect(savedUser.username).toBe('test_user');
        expect(savedUser.email).toBe('test@test.com');
        // expect(testUser.email).toBe('test@tes.com');
    });
});