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
    console.dir({email, password, username})
    const newUser = new User({ username, email });
    await newUser.setPassword(password);
    await newUser.save();
};

module.exports = { 
    getAllUsers,
    getUserByEmail,
    getUserByName,
    createUser,
 };
