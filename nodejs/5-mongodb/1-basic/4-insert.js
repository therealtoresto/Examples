const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017'; // MongoDB connection string
const dbName = 'testDb';
const colName = 'testCollection';

const doc = { 
    _id: 1,
    name: 'John Doe',
    age: 30,
    skills: ['JavaScript', 'MongoDB']
};

const client = new MongoClient(url);
const db = client.db(dbName);
const collection = db.collection(colName);

const connect = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

const insertDoc = async (doc) => {
    try {
      const result = await collection.insertOne(doc);
      console.log('Document inserted id:', result.insertedId);
    } catch (err) {
        console.error('Error inserting document:', err);
    } finally {
      console.log('Client disconnected');
      client.close();
    }

}

connect().then(() => {
    insertDoc(doc);
});
