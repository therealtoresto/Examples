const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/goit';
const connection = mongoose.connect(url);

const { Schema, model } = mongoose;

const taskSchema = new Schema({
    title: {
        type: String,
        minLength: 5,
        maxLength: 70,
        unique: true,
        required: [true, "Title is required"]
    },
    text: {
        type: String,
        minLength: 8,
        maxLength: 100,
        required: [true, "Text is required"]
    },
    isDone: {
        type: Boolean,
        default: false
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }},
    { versionKey: false, timestamps: true }
);

const Task = model('Task', taskSchema);

module.exports = Task;