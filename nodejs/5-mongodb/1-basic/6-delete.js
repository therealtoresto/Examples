const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017'; // MongoDB connection string
const dbName = 'testDb';
const colName = 'testCollection';

const client = new MongoClient(url);
const col = client.db(dbName).collection(colName);

const filter = { name: 'John Doe' };

const connectToMongoDB = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

const deleteDoc = async (filter) => {
    try {
        const result = await col.deleteOne(filter);
        console.log(`${result.deletedCount} document(s) removed.`);
    } catch (err) {
        console.error('Error deleting document:', err);
    } finally {
        console.log('Client disconnected');
        client.close();
    }
}

connectToMongoDB().then(() => {
    deleteDoc(filter);
});
