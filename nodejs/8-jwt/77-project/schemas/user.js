const mongoose = require('mongoose');
const crypto = require('node:crypto');

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
        maxLength: 128,
        required: [true, "Password is required"]
    },
    username: {
        type: String,
        unique: true,
        required: [true, "Username is required"]
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'guest'],
        default: 'user'
    },
    tasks: {
        type: [Schema.Types.ObjectId],
        ref: 'Task'
    }},
    { versionKey: false, timestamps: true }
);

const makeHash = async (password) => {
    return new Promise((resolve, reject) => {
      crypto.scrypt(password, process.env.SALT, 64, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash.toString('hex'));
      });
    });
};

userSchema.methods.setPassword = async function (password) {
    try {
        this.password = await makeHash(password);
    } catch (err) {
        console.log(err.message);
    }

};

userSchema.methods.validPassword = async function (password) {
    try {
        const hash = await makeHash(password);
        return hash === this.password;
    } catch (err) {
        console.log(err.message);
    }
};

const User = model('User', userSchema);

module.exports = User;