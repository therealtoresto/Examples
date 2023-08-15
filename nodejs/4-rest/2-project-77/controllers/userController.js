const User = require('../models/user.js');

const users = [
    new User(1, 'John'),
    new User(2, 'Bob'),
    new User(3, 'Linda')
];

const jurii = { id: 5, name: 'Jurii' };

const getUserList = (req, res) => {
    res.render('users', { users });
};

const createUser = (req, res) => {
    const id = parseInt(req.body.id);
    const newUser = { id, name: req.body.name };
    users.push(newUser);
    res.status(200).json(req.body);
}

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex((user) => user.id === id);
    console.log(index, id);
    if (index !== -1) {
        const deletedUser = users.splice(index, 1)[0];
        res.json(deletedUser);
    } else {
        res.status(404).send('User not found');
    }
}

const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id, users);
    const updatedUser = req.body;

    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
        users[index] = updatedUser;
        res.json(updatedUser);
    } else {
        res.status(404).send('User not found');
    }
}


module.exports = {
    getUserList,
    createUser,
    deleteUser,
    updateUser
}
