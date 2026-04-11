// Load environment variables (so we can use MONGODB_URI from .env)
require("dotenv").config();

const { MongoClient, ServerApiVersion } = require("mongodb");
const dns = require("dns");

// Try to use reliable DNS servers (helps avoid connection issues in some networks)
try {
  dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
} catch (err) {
  // If this fails, it's not a big deal—just continue normally
}

// Use the URI from .env, if not fall back to local MongoDB
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/todosdb";

// MongoDB connection settings
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

// We'll store the client here so we don't reconnect every time
let client = null;

// Connect to MongoDB (only once)
const connectToMongoDB = async () => {
  if (!client) {
    client = await MongoClient.connect(uri, options);
    console.log("Connected to MongoDB");
  }

  return client;
};

// Just returns the existing client (assumes you've already connected)
const getConnectedClient = () => client;

module.exports = {
  connectToMongoDB,
  getConnectedClient,
};
