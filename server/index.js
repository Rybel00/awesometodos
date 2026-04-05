require("dotenv").config();
const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./database");

const app = express();
app.use(express.json());

// Serve React build
app.use(express.static(path.join(dirname, "build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(dirname, "build", "index.html"));
});

// API routes
const router = require("./routes");
app.use("/api", router);

const port = process.env.PORT || 5000;

const startServer = async () => {
  const client = await connectToMongoDB();
  if (!client) {
    console.error("Failed to connect to MongoDB. Server is still running, but API may not work.");
  }
  app.listen(port, () => {
    console.log(Server is listening on http://localhost:${port});
  });
};

startServer();
