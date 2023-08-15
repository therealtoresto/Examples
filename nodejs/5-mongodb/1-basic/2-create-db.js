const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017'; // MongoDB connection string
const client = new MongoClient(url);

const databaseName = 'testDb';
const collectionName = 'testCollection';

const createDatabase = async (databaseName, collectionName) => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(databaseName);
    await db.createCollection(collectionName);
    console.log(`Database '${databaseName}' and collection '${collectionName}' created.`);
  } catch (err) {
    console.error('Error creating database:', err);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

createDatabase(databaseName, collectionName);
