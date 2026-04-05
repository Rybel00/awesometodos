require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const dns = require('dns');

try { dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']); } catch (e) {}

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/todosdb";

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
};

let client;

const connectToMongoDB = async () => {
  try {
    if (!client) {
      client = await MongoClient.connect(uri, options);
      console.log("✅ Connected to MongoDB");
    }
    return client;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
};

const getConnectedClient = () => client;

module.exports = { connectToMongoDB, getConnectedClient };
