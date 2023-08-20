const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017';
const connection = mongoose.connect(url);

connection.then(() => {
        console.log('Connected to MongoDB with mongoose');
    })
    .catch((err) => {
        console.log('Error with connection', err);
    })
    .finally(async () => {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    });
