const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // MongoDB connection string
const databaseName = 'testDb';
const collectionName = 'testCollection';

const client = new MongoClient(uri);
const collection = client.db(databaseName).collection(collectionName);

const filter = { name: 'John Doe' };

const connectToMongoDB = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

const deleteDocument = async (filter) => {
    try {
        const result = await collection.deleteOne(filter);
        console.log(`${result.deletedCount} document(s) removed.`);
    } catch (err) {
        console.error('Error deleting document:', err);
    } finally {
        console.log('Client disconnected');
        client.close();
    }
}

connectToMongoDB();
deleteDocument(filter);
