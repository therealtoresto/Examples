const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017'; // MongoDB connection string
const dbName = 'testDb';
const colName = 'testCollection';

const client = new MongoClient(url);
const col = client.db(dbName).collection(colName);

const filter = { name: 'John Doe' };
const data = { $set: { age: 35 } };

const connect = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}


const updateDoc = async (filter, data) => {
    try {
        const result = await col.updateOne(filter, data);
        await col.updateOne(
            { _id: 1 },
            { $unset: { age: 35 } } // remove field
        );

        await col.updateOne(
            { _id: 1 },
            { $pull: { skills: 'JavaScript' } } // remove element from array 
        );

        await col.updateOne(
            { _id: 1 },
            { $addToSet: { skills: 'PostgreSQL' } } // add to arr if it isn`t defined
        );

        console.log(`${result.modifiedCount} document(s) updated.`);
        console.log(`${result.matchedCount} document(s) matched.`);
    } catch (err) {
        console.error('Error updating document:', err);
    } finally {
        console.log('Client disconnected');
        client.close();
    }
}

connect().then(() => {
    updateDoc(filter, data);
});
