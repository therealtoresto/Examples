const Task = require('../schemas/task.js');
const User = require('../schemas/user.js');

const getAllTasks = async () => {
    return Task.find().populate('owner');
};

const getTaskById = async (id) => {
    return Task.findById(id);
}

const getTasksByUserEmail = async (email) => {
    const user = User.findOne({ email });
    return user.tasks;
};

const createTask = async ({ username, title, text }) => {
    try {
        const user = await User.findOne({ username });
        const task = await Task.create({ title, text, owner: user._id})
        await User.updateOne({ username }, { $push: { tasks: task._id }});
    } catch (err) {
        console.log('Task service:', err.message);
        throw new Error(err);
    }
};

module.exports = {
    getAllTasks,
    getTaskById,
    getTasksByUserEmail,
    createTask
 };
