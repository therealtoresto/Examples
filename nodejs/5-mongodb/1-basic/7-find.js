const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017'; // MongoDB connection string

const dbName = 'testDb';
const colName = 'testCollection';

const client = new MongoClient(url);
const col = client.db(dbName).collection(colName);

const filter = { age: { $gt: 25 } }; // try $qt, $lt, 
const cursor = col.find(filter);

const connect = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

const findDoc = async (filter) => {
    try {
        const documents = await cursor.toArray();
        console.log('Documents found:', documents);
    } catch (err) {
        console.error('Error finding documents:', err);
    } finally {
        console.log('Client disconnected');
        await cursor.close();
        await client.close();
    }
}

connect().then(() => {
    findDoc(filter);
});
