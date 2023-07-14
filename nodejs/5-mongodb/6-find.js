const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // MongoDB connection string

const databaseName = 'testDb';
const collectionName = 'testCollection';

const client = new MongoClient(uri);
const collection = client.db(databaseName).collection(collectionName);

const filter = { age: { $gt: 25 } }; // try $qt, $lt, 

const connectToMongoDB = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

const findDocuments = async (filter) => {
    try {
        const cursor = collection.find(filter);
        const documents = await cursor.toArray();
        console.log('Documents found:', documents);
    } catch (err) {
        console.error('Error finding documents:', err);
    } finally {
        console.log('Client disconnected');
        client.close();
    }
}


connectToMongoDB();
findDocuments(filter);