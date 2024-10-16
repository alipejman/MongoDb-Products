const { MongoClient } = require('mongodb');

class ConnectToMongoDb {
  #DB_URL = 'mongodb://localhost:27017/Products-Manager';
  #db = null;

  async #connect() {
    try {
      let Client = new MongoClient(this.#DB_URL);
      await Client.connect();
      this.#db = Client.db();
      return this.#db;
    } catch (error) {
      console.log('Connection error:', error.message);
      return null;
    }
  }

  async Get() {
    try {
      if (this.#db) {
        console.log('db connection is already alive...');
        return this.#db;  
      }
      this.#db = await this.#connect();
      if (!this.#db) {
        throw new Error('Failed to connect to the database');
      }
      return this.#db;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }
}

module.exports = ConnectToMongoDb;
