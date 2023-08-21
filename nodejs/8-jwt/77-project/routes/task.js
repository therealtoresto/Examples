const express = require('express');

const {
    getAllTasksController,
    createTaskController,
    renderTaskFormController
} = require('../controllers/task.js');
const { auth } = require('../controllers/auth.js');

const taskRouter = express.Router();

taskRouter.post('/create', createTaskController);

taskRouter.get('/create', renderTaskFormController)

taskRouter.get('/all', auth, getAllTasksController);

module.exports = taskRouter;
