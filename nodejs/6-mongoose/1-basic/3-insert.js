const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/goit';
const connection = mongoose.connect(url);

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        minLength: 5,
        maxLength: 70,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        minLength: 8,
        maxLength: 100,
        required: [true, "Password is required"]
    },
    username: {
        type: String,
        default: ''
    }
});

const User = mongoose.model('User', userSchema);

connection.then(() => {
        console.log('Connected to MongoDB with mongoose');
        User.create({
            email: 'goit2@gmail.com',
            password: 'd23ded23fd23',
            username: 'goit_user'
        });
    })
    .catch((err) => {
        console.log('Error with connection', err);
    })
    .finally(async () => {
        console.log('Document added');
    });