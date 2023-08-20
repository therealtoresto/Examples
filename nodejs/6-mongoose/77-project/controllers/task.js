const {
    getAllTasks,
    getTaskById,
    getTasksByUserEmail,
    createTask
} = require('../services/task.js');

const { getAllUsers } = require('../services/user.js')

const renderTaskFormController = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.render('create-task', { users });
    } catch (err) {
        console.log(err);
        res.send({
            data: err
        });
    }
}

const createTaskController = async (req, res) => {
    try {
        const { username, title, text } = req.body;
        await createTask({ username, title, text });
        const tasks = await getAllTasks();
        res.render('tasks', { tasks })
    } catch(err) {
        console.log(err);
        res.send({
            data: err
        });
    }
};

const getAllTasksController = async (req, res) => {
    try {
        const tasks = await getAllTasks();
        res.render('tasks', { tasks });
    } catch(err) {
        console.log(err);
        res.send({
            data: err
        });
    }
};

module.exports = {
    renderTaskFormController,
    createTaskController,
    getAllTasksController
}