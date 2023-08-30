const { 
    getAllUsers,
    getUserByEmail,
    getUserByName
 } = require('../services/user.js');

const getUserList = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.render('users', { users });
    } catch (err) {
        res.send({
            data: err
        });
    }
};

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    try {
        res.json(deletedUser);
    } catch (err) {
        res.status(404).send('User not found');
    }
}

const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id, users);
    const updatedUser = req.body;

    try {
        res.json({});
    } catch (err) {
        res.status(404).send('User not found');
    }
}

module.exports = {
    getUserList,
    deleteUser,
    updateUser
}
