const express = require('express');

const {
    getUserList,
    createUserController,
    deleteUser,
    updateUser,
    renderUserFormController
} = require('../controllers/user.js');

const { auth, login } = require('../controllers/auth.js')

const userRouter = express.Router();

userRouter.get('/create', renderUserFormController);

userRouter.post('/create', createUserController);

userRouter.get('/all', auth, getUserList);

userRouter.put('/', updateUser);

userRouter.delete('/', deleteUser);

module.exports = userRouter;
