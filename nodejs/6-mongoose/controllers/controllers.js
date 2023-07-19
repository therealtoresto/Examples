const services = require('../services/service.js');

const get = async (req, res, next) => {
    try {
        const results = await services.getAllTasks();
        res.json({
            status: 'success',
            code: 200,
            data: {
                tasks: results
            }
        })
    } catch(err) {
        console.error(err);
        next(err);
    }
}

const getById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const results = await services.getTaskById(id);
        if (results) {
            res.json({
                status: 'success',
                code: 200,
                data: {
                    tasks: results
                }
            });
        } else {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: `Not found task id: ${id}`,
                data: 'Not found'
            });
        }
    } catch(err) {
        console.error(err);
        next(err);
    }
}

const create = async (req, res, next) => {
    const { title, text } = req.body;
    try {
        const results = await services.createTask({ title, text });
        res.json({
            status: 'success',
            code: 200,
            data: {
                tasks: results
            }
        })
    } catch(err) {
        console.error(err);
        next(err);
    }
}

const update = async (req, res, next) => {
    const { id } = req.params;
    const { title, text } = req.body;
    try {
        const results = await services.updateTask(id, { title, text });
        if (results) {
            res.json({
                status: 'success',
                code: 200,
                data: {
                    tasks: results
                }
            });
        } else {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: `Not found task id: ${id}`,
                data: 'Not found'
            });
        }
    } catch(err) {
        console.error(err);
        next(err);
    }
}

const updateStatus = async (req, res, next) => {
    const { id } = req.params;
    const { isDone = false } = req.body;
    try {
        const results = await services.updateTask(id, { isDone });
        if (results) {
            res.json({
                status: 'success',
                code: 200,
                data: {
                    tasks: results
                }
            });
        } else {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: `Not found task id: ${id}`,
                data: 'Not found'
            });
        }
    } catch(err) {
        console.error(err);
        next(err);
    }
}

const remove = async (req, res, next) => {
    const { id } = req.params;
    try {
        const results = await services.deleteTask(id);
        if (results) {
            res.json({
                status: 'success',
                code: 200,
                data: {
                    tasks: results
                }
            });
        } else {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: `Not found task id: ${id}`,
                data: 'Not found'
            });
        }
    } catch(err) {
        console.error(err);
        next(err);
    }
}

module.exports = {
    get,
    getById,
    create,
    update,
    updateStatus,
    remove
}
