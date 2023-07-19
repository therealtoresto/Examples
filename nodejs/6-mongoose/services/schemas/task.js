const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const task = new Schema(
    {
        title: {
            type: String,
            minLength: 2,
            maxLength: 70,
        },
        text: {
            type: String,
            minLength: 3,
            maxLength: 100,
        },
        isDone: {
            type: Boolean,
            default: false
        }
    },
    { versionKey: false, timestamps: true }
);

const Task = model('Task', task);

module.exports = Task;
