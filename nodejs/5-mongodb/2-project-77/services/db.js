const { MongoClient } = require('mongodb');

class Database {
    constructor(url, dbName) {
        this.url = url;
        this.dbName = dbName
    }

    async connect() {
        try {
            this.client = await MongoClient.connect(this.url);
            this.db = this.client.db(this.dbName);
            console.log(`Connected to db: ${this.dbName}`);
        } catch (err) {
            console.error(`Error with connection to db: ${dbName}`, err);
        }
    }

    async close() {
        await this.client.close();
        console.log('Connection closed');
    }

    collection(col) {
        return this.db.collection(col);
    }
}

class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

module.exports = { Database, User };
