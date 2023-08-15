const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017'; // MongoDB connection string
const client = new MongoClient(url);

const dbName = 'testDb';

const dropDb = async (db) => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    await db.dropDatabase();
    console.log(`Database '${dbName}' was deleted`);
  } catch (err) {
    console.error('Error deleting database:', err);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

dropDb(dbName);
