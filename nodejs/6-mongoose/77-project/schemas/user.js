const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/goit';
const connection = mongoose.connect(url);

const { Schema, model } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        minLength: 5,
        maxLength: 70,
        unique: true,
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
        unique: true,
        required: [true, "Username is required"]
    },
    tasks: {
        type: [Schema.Types.ObjectId],
        ref: 'Task'
    }},
    { versionKey: false, timestamps: true }
);

const User = model('User', userSchema);

module.exports = User;