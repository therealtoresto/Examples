const express = require('express');

const {
    getUserList,
    createUserController,
    deleteUser,
    updateUser,
    renderUserFormController
} = require('../controllers/user.js')

const userRouter = express.Router();

userRouter.get('/create', renderUserFormController);

userRouter.post('/', createUserController);

userRouter.get('/all', getUserList);

userRouter.put('/', updateUser);

userRouter.delete('/', deleteUser);

module.exports = userRouter;
