const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

function getDatabase() {
  return client.db(process.env.MONGODB_DATABASE);
}

async function closeDatabase() {
  try {
    await client.close();
    console.log("Closed MongoDB connection");
  } catch (error) {
    console.error("Failed to close MongoDB connection:", error);
    process.exit(1);
  }
}

module.exports = { connectToDatabase, getDatabase, closeDatabase };
