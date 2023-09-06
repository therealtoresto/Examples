const express = require('express');

const {
    getUserList,
    deleteUser,
    updateUser,
} = require('../controllers/user.js');

const { isLoggedIn } = require('../controllers/auth.js');

const userRouter = express.Router();

userRouter.get('/all', isLoggedIn, getUserList);

userRouter.put('/', updateUser);

userRouter.delete('/', deleteUser);

module.exports = userRouter;
