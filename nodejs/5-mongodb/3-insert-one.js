const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // MongoDB connection string
const newDocument = { _id: 1, name: 'John Doe', age: 30 };
const databaseName = 'testDb';
const collectionName = 'testCollection';

const client = new MongoClient(uri);
const collection = client.db(databaseName).collection(collectionName);

const connectToMongoDB = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

const insertDocument = async (document) => {
    try {
      const result = await collection.insertOne(document);
      console.log('Document inserted:', result.insertedId);
    } catch (err) {
        console.error('Error inserting document:', err);
    } finally {
      console.log('Client disconnected');
      client.close();
    }

}

connectToMongoDB();
insertDocument(newDocument);
