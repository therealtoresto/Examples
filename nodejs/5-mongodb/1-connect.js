const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // MongoDB connection string
const client = new MongoClient(uri);

const connectToMongoDB = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

connectToMongoDB();
