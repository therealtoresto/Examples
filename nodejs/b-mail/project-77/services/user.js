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

const createUser = async ({ username, email, role }) => {
    return new User({ username, email, role });
};

module.exports = { 
    getAllUsers,
    getUserByEmail,
    getUserByName,
    createUser,
 };
