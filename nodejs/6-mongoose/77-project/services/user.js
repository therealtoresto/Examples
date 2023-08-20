const User = require('../schemas/user.js');

const getAllUsers = async () => {
    return User.find();
};

const getUserByEmail = async (email) => {
    return User.findOne({ email });
};

const getUserByName = async (username) => {
    return User.findOne({ username });
}

const createUser = async ({ email, password, username }) => {
    return User.create({ email, password, username });
};

module.exports = { 
    getAllUsers,
    getUserByEmail,
    getUserByName,
    createUser,
 };
