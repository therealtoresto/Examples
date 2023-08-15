const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017'; // MongoDB connection string

const dbName = 'testDb';
const colName = 'testCollection';

const client = new MongoClient(url);
const col = client.db(dbName).collection(colName); 

const PAGE_SIZE = 10;
const PAGE_NUM = 1;

const skip = (PAGE_NUM - 1) * PAGE_SIZE;
const cursor = col.find().skip(skip).limit(PAGE_SIZE);

const connect = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

const findDoc = async () => {
    try {
        const docs = await cursor.toArray();
        console.log('Documents found:', docs);
    } catch (err) {
        console.error('Error finding documents:', err);
    } finally {
        console.log('Client disconnected');
        await cursor.close();
        await client.close();
    }
}

connect().then(() => {
    findDoc();
});
