const Task = require('./schemas/task.js');

const getAllTasks = async () => {
    return Task.find();
}

const getTaskById = async (id) => {
    return Task.findOne({ _id: id });
}

const createTask = async ({ title, text }) => {
    return Task.create({ title, text });
}

const updateTask = async (id, fields) => {
    return Task.findOneAndUpdate({ _id: id }, fields)
}

const deleteTask = async (id) => {
    return Task.findOneAndRemove({ _id: id });
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
}