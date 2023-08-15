const { Database, User } = require('../services/db.js');
require('dotenv').config();

const users = [
    new User(1, 'John'),
    new User(2, 'Bob'),
    new User(3, 'Linda')
];

const jurii = { id: 5, name: 'Jurii' };

const getUserList = (req, res) => {
    res.render('users', { users });
};

const { MONGO_URL, DB_NAME, COL_NAME } = process.env;
const database = new Database(MONGO_URL, DB_NAME);

const renderHomepage = (req, res) => {
    res.send(`<form action="/users" method="POST">
        <label for="email">Email</label>
        <input type="email" name="email" id="email"><br><br>
        <label for="password">Password</label>
        <input type="password" name="password" id="password"><br><br>
        <button type="submit">Register</button>
    </form>`);
};

const createUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        await database.connect();
        await database.collection(COL_NAME).insertOne({ email, password });
        res.status(200).json(req.body);
    } catch (err) {
        console.log('Error with working with mongodb', err);
    }
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
    updateUser,
    renderHomepage
}
