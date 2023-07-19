const express = require('express');
const taskController = require('../controllers/controllers.js');

const router = express.Router();
const {
    get,
    getById,
    create,
    update,
    updateStatus,
    remove
} = taskController;

router.get('/tasks', get);

router.get('/tasks/:id', getById);

router.post('/tasks', create);

router.put('/tasks/:id', update);

router.patch('/tasks/:id/status', updateStatus);

router.delete('/tasks/:id', remove);

module.exports = router;
