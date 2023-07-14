const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // MongoDB connection string
const databaseName = 'testDb';
const collectionName = 'testCollection';

const client = new MongoClient(uri);
const collection = client.db(databaseName).collection(collectionName);

const filter = { name: 'John Doe' };
const data = { $set: { age: 35 } };

const connectToMongoDB = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}


const updateDocument = async (filter, data) => {
    try {
        const result = await collection.updateOne(filter, data);
        console.log(`${result.modifiedCount} document(s) updated.`);
    } catch (err) {
        console.error('Error updating document:', err);
    } finally {
        console.log('Client disconnected');
        client.close();
    }
}


connectToMongoDB();
updateDocument(filter, data);
